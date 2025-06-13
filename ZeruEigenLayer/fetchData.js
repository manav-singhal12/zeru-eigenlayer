import mongoose from 'mongoose';
import dotenv from 'dotenv';
import queryEigenLayerGraph from './utils/graphQl.js';

import Restaker from './models/Restaker.js';
import Validator from './models/Validator.js';
import Reward from './models/Reward.js';

dotenv.config();

await mongoose.connect(process.env.MONGO_URI);
console.log('✅ Connected to MongoDB');

const stakeQ = `
{
  stakes: restakes(first: 1000) {
    user
    amount
    validator {
      id
    }
  }
  ops: validators(first: 1000) {
    id
    totalDelegated
    status
    slashEvents {
      timestamp
      amount
      reason
    }
  }
}`;

const d = await queryEigenLayerGraph(process.env.EIGEN_SUBGRAPH, stakeQ);

await Restaker.deleteMany({});
await Validator.deleteMany({});

await Restaker.insertMany(
  d.stakes.map((s) => ({
    address: s.user.toLowerCase(),
    validator: s.validator.id,
    amount: parseFloat(s.amount),
  }))
);

await Validator.insertMany(
  d.ops.map((o) => ({
    operator: o.id,
    totalDelegated: parseFloat(o.totalDelegated),
    status: o.status,
    slashHistory: o.slashEvents.map((e) => ({
      when: new Date(Number(e.timestamp) * 1000),
      amount: parseFloat(e.amount),
      reason: e.reason,
    })),
  }))
);

console.log('✅ Restakers and Validators updated.');

const addresses = await Restaker.distinct('address');

for (const addr of addresses) {
  const rq = `
    query($user: ID!) {
      account(id: $user) {
        rewards: restakingRewards {
          amount
          validator {
            id
          }
          timestamp
        }
      }
    }`;

  const r = await queryEigenLayerGraph(process.env.EIGEN_SUBGRAPH, rq, { user: addr });

  const recs = r.account?.rewards || [];

  await Reward.updateOne(
    { address: addr },
    {
      $set: {
        totalRewards: recs.reduce((s, x) => s + parseFloat(x.amount), 0),
        breakdown: recs.map((x) => ({
          validator: x.validator.id,
          amount: parseFloat(x.amount),
          timestamp: new Date(Number(x.timestamp) * 1000),
        })),
      },
    },
    { upsert: true }
  );
}

console.log('✅ Rewards updated.');
await mongoose.disconnect();
console.log('✅ Done');
