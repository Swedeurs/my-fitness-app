import { useState } from "react";

interface ReviewFormProps {
  sessionId: number;
  revieweeId: number;
}

export default function ReviewForm({ sessionId, revieweeId }: ReviewFormProps) {
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");

  const handleSubmit = async () => {
    if (!rating || !comment) {
      alert("Please fill out the rating and comment fields.");
      return;
    }

    await fetch("/api/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId, revieweeId, rating, comment }),
    });
    setRating(0);
    setComment("");
  };

  return (
    <div>
      <h3>Leave a Review</h3>
      <input
        type="number"
        value={rating}
        onChange={(e) => setRating(parseInt(e.target.value))}
        min="1"
        max="5"
      />
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Leave a comment"
      />
      <button onClick={handleSubmit}>Submit Review</button>
    </div>
  );
}
