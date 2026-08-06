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
import {
  Doc,
  Id,
} from "../../../../convex/_generated/dataModel";

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

  const updateStatus = useMutation(
    api.interviews.updateInterviewStatus
  );

  const handleStatusUpdate = async (
    interviewId: Id<"interviews">,
    status: string
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
    <div className="container mx-auto py-10">
      <div className="mb-8 flex items-center">
        <Button
          nativeButton={false}
          render={<Link href="/schedule" />}
        >
          Schedule New Interview
        </Button>
      </div>

      <div className="space-y-8">
        {INTERVIEW_CATEGORY.map((category) => {
          const categoryInterviews =
            groupedInterviews[category.id];

          if (!categoryInterviews?.length) {
            return null;
          }

          return (
            <section key={category.id}>
              {/* CATEGORY TITLE */}
              <div className="mb-4 flex items-center gap-2">
                <h2 className="text-xl font-semibold">
                  {category.title}
                </h2>

                <Badge variant={category.variant}>
                  {categoryInterviews.length}
                </Badge>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {categoryInterviews.map(
                  (interview: Interview) => {
                    const candidateInfo = getCandidateInfo(
                      users,
                      interview.candidateId
                    );

                    const startTime = new Date(
                      interview.startTime
                    );

                    return (
                      <Card
                        key={interview._id}
                        className="transition-all hover:shadow-md"
                      >
                        {/* CANDIDATE INFO */}
                        <CardHeader className="p-4">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10">
                              <AvatarImage
                                src={candidateInfo.image}
                                alt={candidateInfo.name}
                              />

                              <AvatarFallback>
                                {candidateInfo.initials}
                              </AvatarFallback>
                            </Avatar>

                            <div className="min-w-0">
                              <CardTitle className="truncate text-base">
                                {candidateInfo.name}
                              </CardTitle>

                              <p className="truncate text-sm text-muted-foreground">
                                {interview.title}
                              </p>
                            </div>
                          </div>
                        </CardHeader>

                        {/* DATE AND TIME */}
                        <CardContent className="p-4">
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <CalendarIcon className="h-4 w-4" />
                              <span>
                                {format(startTime, "MMM dd")}
                              </span>
                            </div>

                            <div className="flex items-center gap-1">
                              <ClockIcon className="h-4 w-4" />
                              <span>
                                {format(startTime, "hh:mm a")}
                              </span>
                            </div>
                          </div>
                        </CardContent>

                        {/* PASS AND FAIL BUTTONS */}
                        <CardFooter className="flex flex-col gap-3 p-4 pt-0">
                          {interview.status === "completed" && (
                            <div className="flex w-full gap-2">
                              <Button
                                className="flex-1"
                                onClick={() =>
                                  handleStatusUpdate(
                                    interview._id,
                                    "succeeded"
                                  )
                                }
                              >
                                <CheckCircle2Icon className="mr-2 h-4 w-4" />
                                Pass
                              </Button>

                              <Button
                                variant="destructive"
                                className="flex-1"
                                onClick={() =>
                                  handleStatusUpdate(
                                    interview._id,
                                    "failed"
                                  )
                                }
                              >
                                <XCircleIcon className="mr-2 h-4 w-4" />
                                Fail
                              </Button>
                            </div>
                          )}

                          <CommentDialog
                            interviewId={interview._id}
                          />
                        </CardFooter>
                      </Card>
                    );
                  }
                )}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}

export default DashboardPage;