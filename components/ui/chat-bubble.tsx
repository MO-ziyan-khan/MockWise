import React from 'react';
import { cn } from '@/lib/utils';
import { Mic, User } from 'lucide-react';

interface ChatBubbleProps {
  content: string;
  isAI?: boolean;
  isLoading?: boolean;
  timestamp?: string;
  className?: string;
}

const ChatBubble = ({
  content,
  isAI = false,
  isLoading = false,
  timestamp,
  className,
}: ChatBubbleProps) => {
  return (
    <div
      className={cn(
        'flex w-full mb-4',
        isAI ? 'justify-start' : 'justify-end',
        className
      )}
    >
      <div
        className={cn(
          'flex max-w-[80%] rounded-lg p-4',
          isAI
            ? 'bg-muted border border-border mr-auto items-start'
            : 'bg-primary text-primary-foreground ml-auto items-end'
        )}
      >
        <div className="flex gap-3">
          {isAI && (
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
              <Mic className="h-4 w-4 text-primary-foreground" />
            </div>
          )}
          {!isAI && (
            <div className="w-8 h-8 bg-background rounded-full flex items-center justify-center flex-shrink-0 order-last ml-2">
              <User className="h-4 w-4 text-foreground" />
            </div>
          )}
          <div className="space-y-1">
            <div className="font-medium text-sm">
              {isAI ? 'AI Interviewer' : 'You'}
            </div>
            <div className="text-sm whitespace-pre-wrap break-words">
              {isLoading ? (
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              ) : (
                content
              )}
            </div>
            {timestamp && (
              <div className="text-xs opacity-70">{timestamp}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBubble;