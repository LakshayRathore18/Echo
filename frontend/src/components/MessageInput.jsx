import { useEffect, useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { Image, Send, X, Smile } from "lucide-react";
import toast from "react-hot-toast";
import EmojiPicker from "emoji-picker-react";

const MessageInput = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const { sendMessage } = useChatStore();
  const [isLoading, setIsLoading] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const emojiPickerRef = useRef(null);

  // Handle image file selection and create preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
    if (file.size > MAX_FILE_SIZE) {
      toast.error("Image must be less than 5MB");
      return;
    }

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // Clear image preview and reset file input
  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // Handle message submission with text and/or image
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;

    setIsLoading(true);
    try {
      await sendMessage({
        text: text.trim(),
        image: imagePreview,
      });

      // Reset form after sending
      setText("");
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      toast.error("Failed to send message");
      console.error("Failed to send message:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle emoji click
  const onEmojiClick = (emojiData) => {
    setText((prevText) => prevText + emojiData.emoji);
    setShowEmojiPicker(false);
  };

  // Close emoji picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target)
      ) {
        setShowEmojiPicker(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="p-4 w-full">
      {/* Image preview with remove button */}
      {imagePreview && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
            />
            <button
              onClick={removeImage}
              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300
              flex items-center justify-center"
              type="button"
            >
              <X className="size-3" />
            </button>
          </div>
        </div>
      )}

      {/* Message input form with text, file upload and send button */}
      <form onSubmit={handleSendMessage} className="flex items-center gap-2">
        <div className="flex-1 flex gap-2 relative">
          {/* Message input */}
          <input
            type="text"
            className="w-full input input-bordered rounded-lg input-sm sm:input-md"
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          {/* Emoji picker */}
          {showEmojiPicker && (
            <div className="absolute bottom-full mb-2" ref={emojiPickerRef}>
              <EmojiPicker onEmojiClick={onEmojiClick} />
            </div>
          )}

          {/* Image upload input */}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
          />

          {/* Emoji picker button */}
          <button
            type="button"
            className="hidden sm:flex btn btn-circle text-zinc-400"
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          >
            <Smile size={20} />
          </button>

          {/* Image upload button */}
          <button
            type="button"
            className={`hidden sm:flex btn btn-circle
                     ${imagePreview ? "text-emerald-500" : "text-zinc-400"}`}
            onClick={() => fileInputRef.current?.click()}
          >
            <Image size={20} />
          </button>
        </div>

        {/* Send button */}
        <button
          type="submit"
          className="btn btn-sm btn-circle"
          disabled={(!text.trim() && !imagePreview) || isLoading}
        >
          {isLoading ? (
            <span className="loading loading-spinner loading-xs" />
          ) : (
            <Send size={22} />
          )}
        </button>
      </form>
    </div>
  );
};
export default MessageInput;
