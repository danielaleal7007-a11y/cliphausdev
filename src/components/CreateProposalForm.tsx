// components/CreateProposalForm.tsx
"use client";

import { useState } from "react";
import { useCreateProposal } from "../hooks/useCreateProposal";
import { DEFAULT_CONTEST_CONFIG } from "./constants/contracts";

export const CreateProposalForm = () => {
  const [proposalDescription, setProposalDescription] = useState("");
  const [contentHash, setContentHash] = useState("");

  const { createProposal, isLoading, error, transactionHash, currentContest } =
    useCreateProposal();
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleSubmit = async () => {
    if (!proposalDescription || !contentHash) return;

    try {
      await createProposal(proposalDescription, contentHash);
      setIsConfirmed(true);
      // Clear form on success
      setProposalDescription("");
      setContentHash("");
    } catch (err) {
      // Error handled by hook
    }
  };

  if (!currentContest) {
    return (
      <div className="glass-strong border border-yellow-400/30 rounded-xl p-8 max-w-2xl mx-auto">
        <div className="flex items-center gap-4">
          <svg className="w-12 h-12 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <p className="text-yellow-400 font-semibold text-lg">
            Please select a contest first to submit a proposal.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-strong rounded-xl shadow-2xl p-8 max-w-3xl mx-auto border border-white/10">
      <div className="mb-8">
        <h3 className="text-3xl font-bold text-white mb-3 flex items-center gap-3">
          <span className="text-3xl">✨</span>
          Submit Meme Proposal
        </h3>
        <div className="flex items-center gap-2 text-sm">
          <span className="text-gray-400">Submitting to:</span>
          <span className="text-[var(--aurora-cyan)] font-mono font-bold">
            {currentContest.slice(0, 8)}...{currentContest.slice(-6)}
          </span>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-bold text-gray-300 mb-3 uppercase tracking-wide">
            Meme Description *
          </label>
          <input
            type="text"
            value={proposalDescription}
            onChange={(e) => setProposalDescription(e.target.value)}
            className="w-full px-4 py-3 glass border border-white/20 rounded-lg focus:outline-none focus:border-[var(--aurora-cyan)] text-white placeholder-gray-500 transition-all duration-300"
            placeholder="Describe your meme..."
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-300 mb-3 uppercase tracking-wide">
            Content Hash (IPFS) *
          </label>
          <input
            type="text"
            value={contentHash}
            onChange={(e) => setContentHash(e.target.value)}
            className="w-full px-4 py-3 glass border border-white/20 rounded-lg focus:outline-none focus:border-[var(--aurora-cyan)] text-white placeholder-gray-500 font-mono transition-all duration-300"
            placeholder="Qm..."
          />
        </div>

        <div className="glass rounded-xl p-6 border border-[var(--aurora-green)]/30">
          <div className="flex items-center gap-3 mb-2">
            <svg className="w-5 h-5 text-[var(--aurora-green)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-white font-bold">Submission Cost</span>
          </div>
          <p className="text-[var(--aurora-green)] text-2xl font-bold font-mono">
            {DEFAULT_CONTEST_CONFIG.COST_TO_PROPOSE} ETH
          </p>
        </div>

        <button
          onClick={handleSubmit}
          disabled={isLoading || isConfirmed || !proposalDescription || !contentHash}
          className="w-full aurora-gradient text-white py-4 px-6 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(0,255,136,0.6)]"
        >
          {isLoading
            ? "🔄 Submitting..."
            : isConfirmed
              ? "✅ Confirmed!"
              : "🚀 Submit Proposal"}
        </button>

        {error && (
          <div className="glass p-6 rounded-xl border border-red-400/50 slide-in-up">
            <p className="font-bold text-red-400 flex items-center gap-2 mb-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Error Submitting Proposal
            </p>
            <p className="text-sm text-gray-300">{error}</p>
          </div>
        )}

        {isConfirmed && (
          <div className="glass p-6 rounded-xl border border-green-400/50 slide-in-up">
            <p className="font-bold text-green-400 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Proposal submitted successfully! 🎉
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
