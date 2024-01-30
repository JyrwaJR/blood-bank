/** @format */

import { cookies } from "next/headers";
import Image from "next/image";
import { Mail } from "./components/mail";
import { accounts, mails } from "./data";
import { Button } from "@/src/components/ui/button";
import MakeBloodRequestDialog from "@/src/components/make-blood-request-dialog";
import { useState } from "react";

export default function MailPage() {
	// const [open, setOpen] = useState<boolean>(false);

	const layout = cookies().get("react-resizable-panels:layout");
	const collapsed = cookies().get("react-resizable-panels:collapsed");

	const defaultLayout = layout ? JSON.parse(layout.value) : undefined;
	// const defaultCollapsed = collapsed ? JSON.parse(collapsed.value) : undefined;

	return (
		<>
			<div className="flex-col flex">
				<Mail
					accounts={accounts}
					// mails={mails}
					defaultLayout={defaultLayout}
					// defaultCollapsed={defaultCollapsed}
					navCollapsedSize={4}
				/>
			</div>
		</>
	);
}
