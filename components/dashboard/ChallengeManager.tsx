// components/dashboard/challenge-manager.tsx
"use client";

import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useLocalStorage } from "@uidotdev/usehooks";
import { Challenge } from "@/lib/types";
import { Plus, Edit, Trash2 } from "lucide-react";

export function ChallengeManager() {
  const [challenges, setChallenges] = useLocalStorage<Challenge[]>(
    "challenges",
    []
  );
  const [newChallenge, setNewChallenge] = useState<Partial<Challenge>>({});
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingChallenge, setEditingChallenge] = useState<Challenge | null>(
    null
  );

  const handleCreateChallenge = (e: React.FormEvent) => {
    e.preventDefault();
    const challenge: Challenge = {
      id: uuidv4(),
      name: newChallenge.name || "",
      startDate: new Date().toISOString(),
      targetDays: newChallenge.targetDays || 30,
      currentStreak: 0,
      totalDays: 0,
      color: newChallenge.color || "#000000",
    };
    setChallenges([...challenges, challenge]);
    setNewChallenge({});
    setIsDialogOpen(false);
  };

  const handleEditChallenge = (challenge: Challenge) => {
    setEditingChallenge(challenge);
    setIsDialogOpen(true);
  };

  const handleUpdateChallenge = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingChallenge) {
      setChallenges(
        challenges.map((c) =>
          c.id === editingChallenge.id ? editingChallenge : c
        )
      );
      setEditingChallenge(null);
      setIsDialogOpen(false);
    }
  };

  const handleDeleteChallenge = (id: string) => {
    setChallenges(challenges.filter((c) => c.id !== id));
  };

  return (
    <Card className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Challenges</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setEditingChallenge(null)}>
              <Plus className="mr-2 h-4 w-4" /> New Challenge
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingChallenge ? "Edit Challenge" : "Create New Challenge"}
              </DialogTitle>
            </DialogHeader>
            <form
              onSubmit={
                editingChallenge ? handleUpdateChallenge : handleCreateChallenge
              }
              className="space-y-4"
            >
              <Input
                placeholder="Challenge Name"
                value={
                  editingChallenge
                    ? editingChallenge.name
                    : newChallenge.name || ""
                }
                onChange={(e) =>
                  editingChallenge
                    ? setEditingChallenge({
                        ...editingChallenge,
                        name: e.target.value,
                      })
                    : setNewChallenge({ ...newChallenge, name: e.target.value })
                }
                required
              />
              <Input
                type="number"
                placeholder="Target Days"
                value={
                  editingChallenge
                    ? editingChallenge.targetDays
                    : newChallenge.targetDays || ""
                }
                onChange={(e) =>
                  editingChallenge
                    ? setEditingChallenge({
                        ...editingChallenge,
                        targetDays: parseInt(e.target.value),
                      })
                    : setNewChallenge({
                        ...newChallenge,
                        targetDays: parseInt(e.target.value),
                      })
                }
                required
              />
              <Input
                type="color"
                value={
                  editingChallenge
                    ? editingChallenge.color
                    : newChallenge.color || "#000000"
                }
                onChange={(e) =>
                  editingChallenge
                    ? setEditingChallenge({
                        ...editingChallenge,
                        color: e.target.value,
                      })
                    : setNewChallenge({
                        ...newChallenge,
                        color: e.target.value,
                      })
                }
              />
              <Button type="submit">
                {editingChallenge ? "Update Challenge" : "Create Challenge"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <ul className="space-y-2">
        {challenges.map((challenge) => (
          <li
            key={challenge.id}
            className="flex justify-between items-center p-2 bg-secondary rounded-md"
          >
            <div>
              <span className="font-medium" style={{ color: challenge.color }}>
                {challenge.name}
              </span>
              <span className="ml-2 text-sm text-muted-foreground">
                {challenge.currentStreak}/{challenge.targetDays} days
              </span>
            </div>
            <div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleEditChallenge(challenge)}
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleDeleteChallenge(challenge.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );
}
