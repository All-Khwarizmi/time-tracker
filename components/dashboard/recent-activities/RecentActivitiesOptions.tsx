import { Button } from "../../ui/button";

export type RecentActivitiesOptionsProps = {
  recentActivities: string[];
  handleActivityClick: (selectedActivity: string) => void;
};
export function RecentActivitiesOptions({
  recentActivities,
  handleActivityClick,
}: RecentActivitiesOptionsProps) {
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
