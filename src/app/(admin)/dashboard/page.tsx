"use client";

import { useMutation, useQuery } from "convex/react";
import { format } from "date-fns";
import Link from "next/link";
import toast from "react-hot-toast";
import {
  CalendarIcon,
  CheckCircle2Icon,
  ClockIcon,
  XCircleIcon,
} from "lucide-react";

import { api } from "../../../../convex/_generated/api";
import { Doc, Id } from "../../../../convex/_generated/dataModel";

import CommentDialog from "@/components/CommentDialog";
import LoaderUI from "@/components/LoaderUI";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { INTERVIEW_CATEGORY } from "@/constants";
import { getCandidateInfo, groupInterviews } from "@/lib/utils";

type Interview = Doc<"interviews">;

function DashboardPage() {
  const users = useQuery(api.users.getUsers);
  const interviews = useQuery(api.interviews.getAllInterviews);

  const updateStatus = useMutation(api.interviews.updateInterviewStatus);

  const handleStatusUpdate = async (
    interviewId: Id<"interviews">,
    status: string,
  ) => {
    try {
      await updateStatus({
        id: interviewId,
        status,
      });

      toast.success(`Interview marked as ${status}`);
    } catch {
      toast.error("Failed to update status");
    }
  };

  if (!interviews || !users) {
    return <LoaderUI />;
  }

  const groupedInterviews = groupInterviews(interviews);

  return (
    <main className="mx-auto flex min-h-[calc(100dvh-4rem)] w-full max-w-7xl min-w-0 flex-col px-3 py-4 min-[380px]:px-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
      <div className="mb-6 flex w-full min-w-0 flex-col gap-3 sm:mb-8 sm:flex-row sm:items-center sm:justify-end">
        <Button
          nativeButton={false}
          render={<Link href="/schedule" />}
          className="w-full sm:w-auto"
        >
          Schedule New Interview
        </Button>
      </div>

      <div className="flex w-full min-w-0 flex-col gap-8 sm:gap-10">
        {INTERVIEW_CATEGORY.map((category) => {
          const categoryInterviews = groupedInterviews[category.id];

          if (!categoryInterviews?.length) {
            return null;
          }

          return (
            <section key={category.id} className="w-full min-w-0">
              {/* CATEGORY TITLE */}
              <div className="mb-4 flex min-w-0 items-center gap-2 px-1">
                <h2 className="min-w-0 break-words text-lg font-semibold sm:text-xl">
                  {category.title}
                </h2>

                <Badge variant={category.variant} className="shrink-0">
                  {categoryInterviews.length}
                </Badge>
              </div>

              <div className="grid w-full min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-3 xl:gap-6">
                {categoryInterviews.map((interview: Interview) => {
                  const candidateInfo = getCandidateInfo(
                    users,
                    interview.candidateId,
                  );

                  const startTime = new Date(interview.startTime);

                  return (
                    <Card
                      key={interview._id}
                      className="flex h-full min-w-0 flex-col overflow-hidden transition-all hover:shadow-md"
                    >
                      {/* CANDIDATE INFO */}
                      <CardHeader className="min-w-0 p-4 sm:p-5">
                        <div className="flex min-w-0 items-center gap-3">
                          <Avatar className="size-10 shrink-0 sm:size-11">
                            <AvatarImage
                              src={candidateInfo.image}
                              alt={candidateInfo.name}
                            />

                            <AvatarFallback>
                              {candidateInfo.initials}
                            </AvatarFallback>
                          </Avatar>

                          <div className="min-w-0 flex-1">
                            <CardTitle className="truncate text-sm sm:text-base">
                              {candidateInfo.name}
                            </CardTitle>

                            <p className="mt-0.5 truncate text-xs text-muted-foreground sm:text-sm">
                              {interview.title}
                            </p>
                          </div>
                        </div>
                      </CardHeader>

                      {/* DATE AND TIME */}
                      <CardContent className="min-w-0 flex-1 px-4 pb-4 pt-0 sm:px-5 sm:pb-5">
                        <div className="flex min-w-0 flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground sm:text-sm">
                          <div className="flex shrink-0 items-center gap-1.5">
                            <CalendarIcon className="size-4 shrink-0" />
                            <span>{format(startTime, "MMM dd")}</span>
                          </div>

                          <div className="flex shrink-0 items-center gap-1.5">
                            <ClockIcon className="size-4 shrink-0" />
                            <span>{format(startTime, "hh:mm a")}</span>
                          </div>
                        </div>
                      </CardContent>

                      {/* PASS AND FAIL BUTTONS */}
                      <CardFooter className="mt-auto flex min-w-0 flex-col gap-3 px-4 pb-4 pt-0 sm:px-5 sm:pb-5">
                        {interview.status === "completed" && (
                          <div className="flex w-full min-w-0 flex-col gap-2 min-[360px]:flex-row">
                            <Button
                              className="w-full min-w-0 flex-1"
                              onClick={() =>
                                handleStatusUpdate(interview._id, "succeeded")
                              }
                            >
                              <CheckCircle2Icon className="mr-2 size-4 shrink-0" />
                              Pass
                            </Button>

                            <Button
                              variant="destructive"
                              className="w-full min-w-0 flex-1"
                              onClick={() =>
                                handleStatusUpdate(interview._id, "failed")
                              }
                            >
                              <XCircleIcon className="mr-2 size-4 shrink-0" />
                              Fail
                            </Button>
                          </div>
                        )}

                        <div className="w-full min-w-0">
                          <CommentDialog interviewId={interview._id} />
                        </div>
                      </CardFooter>
                    </Card>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </main>
  );
}

export default DashboardPage;