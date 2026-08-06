import { useUser } from "@clerk/nextjs";
import { useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useMutation, useQuery } from "convex/react";
import { useState } from "react";
import { api } from "../../../../convex/_generated/api";
import toast from "react-hot-toast";
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogContent,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import UserInfo from "@/components/UserInfo";
import { Loader2Icon, XIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { TIME_SLOTS } from "@/constants";
import MeetingCard from "@/components/MeetingCard";

function InterviewScheduleUI() {
  const client = useStreamVideoClient();
  const { user } = useUser();
  const [open, setOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  const interviews = useQuery(api.interviews.getAllInterviews) ?? [];
  const users = useQuery(api.users.getUsers) ?? [];
  const createInterview = useMutation(api.interviews.createInterview);

  const candidates = users?.filter((u) => u.role === "candidate");
  const interviewers = users?.filter((u) => u.role === "interviewer");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: new Date(),
    time: "09:00",
    candidateId: "",
    interviewerIds: user?.id ? [user.id] : [],
  });

  const scheduleMeeting = async () => {
    if (!client || !user) return;
    if (!formData.candidateId || formData.interviewerIds.length === 0) {
      toast.error("Please select both candidate and at least one interviewer");
      return;
    }

    setIsCreating(true);

    try {
      const { title, description, date, time, candidateId, interviewerIds } = formData;
      const [hours, minutes] = time.split(":");
      const meetingDate = new Date(date);
      meetingDate.setHours(parseInt(hours), parseInt(minutes), 0);

      const id = crypto.randomUUID();
      const call = client.call("default", id);

      await call.getOrCreate({
        data: {
          starts_at: meetingDate.toISOString(),
          custom: {
            description: title,
            additionalDetails: description,
          },
        },
      });

      await createInterview({
        title,
        description,
        startTime: meetingDate.getTime(),
        status: "upcoming",
        streamCallId: id,
        candidateId,
        interviewerIds,
      });

      setOpen(false);
      toast.success("Meeting scheduled successfully!");

      setFormData({
        title: "",
        description: "",
        date: new Date(),
        time: "09:00",
        candidateId: "",
        interviewerIds: user?.id ? [user.id] : [],
      });
    } catch (error) {
      console.error(error);
      toast.error("Failed to schedule meeting. Please try again.");
    } finally {
      setIsCreating(false);
    }
  };

  const addInterviewer = (interviewerId: string) => {
    if (!formData.interviewerIds.includes(interviewerId)) {
      setFormData((prev) => ({
        ...prev,
        interviewerIds: [...prev.interviewerIds, interviewerId],
      }));
    }
  };

  const removeInterviewer = (interviewerId: string) => {
    if (interviewerId === user?.id) return;
    setFormData((prev) => ({
      ...prev,
      interviewerIds: prev.interviewerIds.filter((id) => id !== interviewerId),
    }));
  };

  const selectedInterviewers = interviewers.filter((i) =>
    formData.interviewerIds.includes(i.clerkId)
  );

  const availableInterviewers = interviewers.filter(
    (i) => !formData.interviewerIds.includes(i.clerkId)
  );

  return (
    <main className="mx-auto flex min-h-[calc(100dvh-4rem)] w-full max-w-7xl min-w-0 flex-col gap-6 px-3 py-4 min-[380px]:px-4 sm:gap-8 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
      <div className="flex w-full min-w-0 flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* HEADER INFO */}
        <div className="min-w-0">
          <h1 className="break-words text-2xl font-bold tracking-tight sm:text-3xl">
            Interviews
          </h1>
          <p className="mt-1 break-words text-sm text-muted-foreground sm:text-base">
            Schedule and manage interviews
          </p>
        </div>

        {/* DIALOG */}

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger
            render={
              <Button size="lg" className="w-full sm:w-auto">
                Schedule Interview
              </Button>
            }
          />

          <DialogContent className="max-h-[calc(100dvh-1rem)] w-[calc(100vw-1rem)] max-w-[calc(100vw-1rem)] overflow-y-auto rounded-2xl p-4 sm:max-h-[calc(100dvh-3rem)] sm:max-w-[540px] sm:p-6">
            <DialogHeader>
              <DialogTitle>Schedule Interview</DialogTitle>
            </DialogHeader>
            <div className="min-w-0 space-y-4 py-2 sm:py-4">
              {/* INTERVIEW TITLE */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Title</label>
                <Input
                  placeholder="Interview title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>

              {/* INTERVIEW DESC */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <Textarea
                  placeholder="Interview description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                />
              </div>

              {/* CANDIDATE */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Candidate</label>
                <Select
                  value={formData.candidateId}
                  onValueChange={(candidateId) =>
                  setFormData({
                  ...formData,
                  candidateId: candidateId ?? "",
                  })
                }
                >
                  <SelectTrigger className="w-full min-w-0">
                    <SelectValue placeholder="Select candidate" />
                  </SelectTrigger>
                  <SelectContent>
                    {candidates.map((candidate) => (
                      <SelectItem key={candidate.clerkId} value={candidate.clerkId}>
                        <UserInfo user={candidate} />
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* INTERVIEWERS */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Interviewers</label>
                <div className="mb-2 flex min-w-0 flex-wrap gap-2">
                  {selectedInterviewers.map((interviewer) => (
                    <div
                      key={interviewer.clerkId}
                      className="inline-flex max-w-full min-w-0 items-center gap-2 rounded-md bg-secondary px-2 py-1 text-sm"
                    >
                      <UserInfo user={interviewer} />
                      {interviewer.clerkId !== user?.id && (
                        <button
                          onClick={() => removeInterviewer(interviewer.clerkId)}
                          type="button"
                          className="shrink-0 transition-colors hover:text-destructive"
                        >
                          <XIcon className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                {availableInterviewers.length > 0 && (
                  <Select
                    onValueChange={(interviewerId) => {
                      if (typeof interviewerId === "string") {
                        addInterviewer(interviewerId);
                      }
                    }}
                  >
                  <SelectTrigger className="w-full min-w-0">
                  <SelectValue placeholder="Add interviewer" />
                  </SelectTrigger>

                  <SelectContent>
                    {availableInterviewers.map((interviewer) => (
                    <SelectItem
                      key={interviewer.clerkId}
                      value={interviewer.clerkId}
                    >
                    <UserInfo user={interviewer} />
                    </SelectItem>
                  ))}
                  </SelectContent>
                </Select>
                )}
              </div>

              {/* DATE & TIME */}
              <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-start">
                {/* CALENDAR */}
                <div className="min-w-0 flex-1 space-y-2">
                  <label className="text-sm font-medium">Date</label>
                  <Calendar
                    mode="single"
                    selected={formData.date}
                    onSelect={(date) => date && setFormData({ ...formData, date })}
                    disabled={(date) => date < new Date()}
                    className="mx-auto w-full max-w-full rounded-md border sm:mx-0"
                  />
                </div>

                {/* TIME */}

                <div className="w-full min-w-0 space-y-2 sm:w-36 sm:shrink-0">
                  <label className="text-sm font-medium">Time</label>
                  <Select
                    value={formData.time}
                    onValueChange={(time) =>
                    setFormData({
                    ...formData,
                    time: time ?? formData.time,
                  })
                }
                >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent>
                      {TIME_SLOTS.map((time) => (
                        <SelectItem key={time} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* ACTION BUTTONS */}
              <div className="flex flex-col-reverse gap-3 pt-3 min-[420px]:flex-row min-[420px]:justify-end sm:pt-4">
                <Button
                  variant="outline"
                  onClick={() => setOpen(false)}
                  className="w-full min-[420px]:w-auto"
                >
                  Cancel
                </Button>
                <Button
                  onClick={scheduleMeeting}
                  disabled={isCreating}
                  className="w-full min-[420px]:w-auto"
                >
                  {isCreating ? (
                    <>
                      <Loader2Icon className="mr-2 size-4 animate-spin" />
                      Scheduling...
                    </>
                  ) : (
                    "Schedule Interview"
                  )}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* LOADING STATE & MEETING CARDS */}
      {!interviews ? (
        <div className="flex justify-center py-12">
          <Loader2Icon className="size-8 animate-spin text-muted-foreground" />
        </div>
      ) : interviews.length > 0 ? (
        <div className="w-full min-w-0">
          <div className="grid w-full min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-3 xl:gap-6">
            {interviews.map((interview) => (
              <div key={interview._id} className="min-w-0">
                <MeetingCard interview={interview} />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex min-h-48 w-full items-center justify-center rounded-2xl border border-border/60 px-4 py-12 text-center text-sm text-muted-foreground sm:text-base">
          No interviews scheduled
        </div>
      )}
    </main>
  );
}
export default InterviewScheduleUI;