"use client";

import React, { useState, useRef } from "react";
import { useFormStatus } from "react-dom";
import { MessageSquare, Send, Loader2, User } from "lucide-react";
import { Button } from "@/app/components/ui/Button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/app/components/ui/Card";
import { Input, Textarea } from "@/app/components/ui/Input";
import { StarRating } from "@/app/components/ui/StarRating";
import { addComment } from "@/app/actions";
import { Comment } from "@/app/lib/db";
import { useTheme } from "@/app/components/ui/ThemeProvider";

interface CommentsSectionProps {
  initialComments: Comment[];
}

// Submit button with loading state
function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      variant="primary"
      disabled={pending}
      className="w-full"
    >
      {pending ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          Mengirim...
        </>
      ) : (
        <>
          <Send className="w-4 h-4" />
          Kirim Feedback
        </>
      )}
    </Button>
  );
}

// Format date to Indonesian locale
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function CommentsSection({
  initialComments,
}: CommentsSectionProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [rating, setRating] = useState(5);
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [error, setError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (formData: FormData) => {
    // Add rating to form data
    formData.set("rating", rating.toString());

    const result = await addComment(formData);

    if (result.success) {
      // Reset form
      formRef.current?.reset();
      setRating(5);
      setError(null);

      // Optimistically add the new comment to the list
      const newComment: Comment = {
        id: Date.now(), // Temporary ID
        name: formData.get("name") as string,
        rating: rating,
        content: formData.get("content") as string,
        created_at: new Date().toISOString(),
      };
      setComments([newComment, ...comments]);
    } else {
      setError(result.error || "Terjadi kesalahan");
    }
  };

  return (
    <Card className="animate-fadeIn">
      <CardHeader>
        <CardTitle icon={<MessageSquare className="w-5 h-5 text-green-500" />}>
          Wall of Feedback
        </CardTitle>
        <CardDescription>
          Bagikan pengalaman dan saran Anda untuk Sapa!
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="space-y-6">
          {/* Form Section */}
          <form ref={formRef} action={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <Input
                name="name"
                label="Nama"
                placeholder="Nama Anda"
                required
              />

              <div className="space-y-1.5">
                <label
                  className={`block text-sm font-medium ${
                    isDark ? "text-neutral-300" : "text-neutral-700"
                  }`}
                >
                  Rating
                </label>
                <div
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border ${
                    isDark
                      ? "bg-[#111111] border-neutral-700"
                      : "bg-white border-neutral-300"
                  }`}
                >
                  <StarRating
                    rating={rating}
                    onRatingChange={setRating}
                    size="lg"
                  />
                  <span
                    className={`text-sm ${
                      isDark ? "text-neutral-400" : "text-neutral-500"
                    }`}
                  >
                    ({rating}/5)
                  </span>
                </div>
              </div>
            </div>

            <Textarea
              name="content"
              label="Komentar"
              placeholder="Tulis feedback Anda di sini..."
              rows={3}
              required
            />

            {error && <p className="text-sm text-red-500">{error}</p>}

            <SubmitButton />
          </form>

          {/* Divider */}
          <div
            className={`border-t ${
              isDark ? "border-neutral-800" : "border-neutral-200"
            }`}
          />

          {/* Comments List */}
          <div className="space-y-4">
            <h4
              className={`text-sm font-medium ${
                isDark ? "text-neutral-400" : "text-neutral-600"
              }`}
            >
              {comments.length} Feedback
            </h4>

            {comments.length === 0 ? (
              <p
                className={`text-center py-8 ${
                  isDark ? "text-neutral-500" : "text-neutral-400"
                }`}
              >
                Belum ada feedback. Jadilah yang pertama! 🎉
              </p>
            ) : (
              <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                {comments.map((comment) => (
                  <div
                    key={comment.id}
                    className={`p-4 rounded-xl border transition-colors ${
                      isDark
                        ? "bg-neutral-900/50 border-neutral-800 hover:border-neutral-700"
                        : "bg-neutral-50 border-neutral-200 hover:border-neutral-300"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`p-2 rounded-full ${
                            isDark ? "bg-neutral-800" : "bg-neutral-200"
                          }`}
                        >
                          <User
                            className={`w-4 h-4 ${
                              isDark ? "text-neutral-400" : "text-neutral-500"
                            }`}
                          />
                        </div>
                        <div>
                          <p
                            className={`font-medium ${
                              isDark ? "text-white" : "text-neutral-900"
                            }`}
                          >
                            {comment.name}
                          </p>
                          <p
                            className={`text-xs ${
                              isDark ? "text-neutral-500" : "text-neutral-400"
                            }`}
                          >
                            {formatDate(comment.created_at)}
                          </p>
                        </div>
                      </div>
                      <StarRating rating={comment.rating} readonly size="sm" />
                    </div>
                    <p
                      className={`mt-3 text-sm ${
                        isDark ? "text-neutral-300" : "text-neutral-600"
                      }`}
                    >
                      {comment.content}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
