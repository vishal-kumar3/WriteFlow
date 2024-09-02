"use client"; // This directive marks the component as a client component

import React, { useTransition } from 'react';
import { Button } from '../ui/button';
import { deleteFlow } from '@/actions/flow.action';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

const DeleteFlowButton = ({ flowId, userId, redirectMode, modeClass }: { flowId: string, userId: string, redirectMode: boolean, modeClass?: string }) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleDelete = async () => {
    const { error, success } = await deleteFlow(flowId);

    if (error) {
      toast.error(error);
    } else if (success) {
      toast.success('Flow deleted successfully.');
      if (!redirectMode) {
        console.log("return jaa rha h")
        router.push(`/user/${userId}`);
      }
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        startTransition(() => {
          handleDelete();
        });
      }}
    >
      <Button
        variant="destructive"
        className={cn('text-black dark:text-white', modeClass)}
        disabled={isPending} // Disable button while deleting
      >
        {isPending ? 'Deleting...' : 'Delete'}
      </Button>
    </form>
  );
};

export default DeleteFlowButton;
