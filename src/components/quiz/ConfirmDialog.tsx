import { SpinnerIcon } from "@phosphor-icons/react";
import type { ReactNode } from "react";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "#/components/shadcn/alert-dialog";

type ConfirmDialogProps = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	title: string;
	description: string;
	confirmLabel: string;
	cancelLabel?: string;
	destructive?: boolean;
	onConfirm: () => void;
	trigger?: ReactNode;
	pending?: boolean;
};

export const ConfirmDialog = ({
	open,
	onOpenChange,
	title,
	description,
	confirmLabel,
	cancelLabel = "Avbryt",
	destructive,
	onConfirm,
	trigger,
	pending = false,
}: ConfirmDialogProps) => {
	return (
		<AlertDialog open={open} onOpenChange={onOpenChange}>
			{trigger && <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>}
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>{title}</AlertDialogTitle>
					<AlertDialogDescription>{description}</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel disabled={pending}>
						{cancelLabel}
					</AlertDialogCancel>
					<AlertDialogAction
						variant={destructive ? "destructive" : "default"}
						disabled={pending}
						onClick={(e) => {
							e.preventDefault();
							onConfirm();
						}}
					>
						{pending && (
							<SpinnerIcon aria-hidden="true" className="size-4 animate-spin" />
						)}
						{confirmLabel}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};
