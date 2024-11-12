import {
  QuickEntry,
  RecentEntries,
  StartSession,
} from "@/components/dashboard";
import { ChallengeManager } from "@/components/dashboard/ChallengeManager";
import { EntryManager } from "@/components/dashboard/EntryManager";
import { TimeInsights } from "@/components/dashboard/TimeInsights";

export default function DashboardPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <QuickEntry />
        <RecentEntries />
        <TimeInsights />
        <StartSession />
        <EntryManager />
        <ChallengeManager />
      </div>
    </div>
  );
}
