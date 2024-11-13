import { Button } from "../../ui/button";

export function RecentActivitiesOptions(
  recentActivities: string[],
  handleActivityClick: (selectedActivity: string) => void
) {
  return (
    <div className="flex flex-wrap gap-2">
      {recentActivities.map((recentActivity) => (
        <Button
          key={recentActivity}
          type="button"
          variant="outline"
          size="sm"
          onClick={() => handleActivityClick(recentActivity)}
        >
          {recentActivity}
        </Button>
      ))}
    </div>
  );
}
