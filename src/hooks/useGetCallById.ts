import { useEffect, useState } from "react";
import {
  Call,
  useStreamVideoClient,
} from "@stream-io/video-react-sdk";

const useGetCallById = (id: string | string[]) => {
  const client = useStreamVideoClient();

  const [call, setCall] = useState<Call>();
  const [isCallLoading, setIsCallLoading] = useState(true);

  const callId = Array.isArray(id) ? id[0] : id;

  useEffect(() => {
    if (!client || !callId) return;

    let isCancelled = false;

    const getCall = async () => {
      setIsCallLoading(true);

      try {
        const { calls } = await client.queryCalls({
          filter_conditions: {
            id: callId,
          },
        });

        if (isCancelled) return;

        setCall(calls[0]);
      } catch (error) {
        if (isCancelled) return;

        console.error("Failed to load meeting:", error);
        setCall(undefined);
      } finally {
        if (!isCancelled) {
          setIsCallLoading(false);
        }
      }
    };

    getCall();

    return () => {
      isCancelled = true;
    };
  }, [client, callId]);

  return {
    call,
    isCallLoading,
  };
};

export default useGetCallById;