import { useAuth } from "../../context/AuthContext";
import { useIsSubscribed } from "../../hooks/subscriptions/useIsSubscribed";
import { useToggleSubscription } from "../../hooks/subscriptions/useToggleSubscription";

import { FiPlus, FiCheck } from "react-icons/fi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

function SubscribeButton({ channelId, variant = "primary" }) {
  const { token, user } = useAuth();
  const isSelf = user?._id === channelId;

  const { data: isSubscribed, isLoading } = useIsSubscribed(
    token && !isSelf ? channelId : null
  );

  const { mutate: toggleSubscribe, isPending } =
    useToggleSubscription(channelId);

  if (!token || isSelf) return null;

  const base =
    "inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200";

  const interactive =
    "active:scale-95 hover:-translate-y-[1px] disabled:cursor-not-allowed";

  const styles = {
    primary: isSubscribed
      ? "bg-neutral-800 text-white hover:bg-neutral-700"
      : "bg-purple-600 hover:bg-purple-700 text-white",

    secondary: isSubscribed
      ? "bg-neutral-700 text-white"
      : "border border-neutral-600 text-white hover:bg-neutral-800",
  };

  return (
    <button
      disabled={isPending || isLoading}
      onClick={() => toggleSubscribe()}
      className={`${base} ${interactive} ${styles[variant]}`}
    >
      {/* ICON SLOT – fixed width, no layout shift */}
      <span className="w-4 h-4 flex items-center justify-center">
        {isPending ? (
          <AiOutlineLoading3Quarters className="animate-spin text-base" />
        ) : isSubscribed ? (
          <FiCheck className="text-base" />
        ) : (
          <FiPlus className="text-base" />
        )}
      </span>

      {/* TEXT NEVER CHANGES POSITION */}
      <span>{isSubscribed ? "Subscribed" : "Subscribe"}</span>
    </button>
  );
}

export default SubscribeButton;
