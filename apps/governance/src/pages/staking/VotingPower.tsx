import { useContext } from 'react';

import { useAccount } from 'wagmi';

import veOGVIcon from '../../assets/ve-ogv.svg';
import { StateContext } from '../../components/AppState';
import { toSignificantDigits } from '../../utils/number';

export const VotingPower = () => {
  const { state } = useContext(StateContext);
  const { isConnected } = useAccount();

  const myVotingPower = state.lockups.reduce((m, l) => {
    return m + l.votingPower;
  }, 0);
  const votingPowerPct = (myVotingPower / state.totalVotes) * 100;
  return (
    <div className="bg-gray-900 rounded-lg text-sm p-6">
      <div className="text-gray-500">My Voting Power</div>
      <div className="flex justify-between items-center text-2xl mt-2 font-medium">
        <div>
          {myVotingPower.toLocaleString(undefined, {
            maximumFractionDigits: 0,
          })}
        </div>
        <div className="flex items-center text-off-white gap-2 text-xl">
          <img src={veOGVIcon} alt="veOGV" />
          veOGV
        </div>
      </div>
      {myVotingPower === 0 ? (
        <div className="mb-6" />
      ) : (
        <div className="mb-6">
          {'('}
          <span className="font-medium">
            {`${toSignificantDigits(votingPowerPct, 4)}% `}
          </span>
          <span className="text-gray-500">of Total Votes</span>
          {')'}
        </div>
      )}
      <div className="flex flex-col gap-4">
        <button
          className={`${
            isConnected ? 'btn-outline' : 'btn-outline-disabled'
          } py-4`}
        >
          Vote
        </button>
        <div className="flex flex-col gap-1">
          <button
            className={`${
              isConnected && myVotingPower > 10000
                ? 'btn-outline'
                : 'btn-outline-disabled'
            } py-4`}
          >
            Create Snapshot Proposal
          </button>
          {isConnected && myVotingPower > 10000 ? null : (
            <div className="text-gray-500 text-center">
              Requires <span className="text-white">10,000 veOGV</span>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <button
            className={`${
              isConnected && myVotingPower > 10000000
                ? 'btn-outline'
                : 'btn-outline-disabled'
            } py-4`}
          >
            Create On-chain Proposal
          </button>
          <div className="text-gray-500 text-center">
            Requires <span className="text-white">10,000,000 veOGV</span>
          </div>
        </div>
      </div>
    </div>
  );
};
