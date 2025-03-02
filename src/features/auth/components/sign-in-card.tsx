import { FcGoogle } from "react-icons/fc"

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { FaGithub } from "react-icons/fa";
import { SignInFlow } from "../types";
import { useState } from "react";
import { Label } from "@/components/ui/label";

interface SignInCardProps {
  setState: (state: SignInFlow) => void;
}

const SignInCard = ({ setState }: SignInCardProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Card className="w-full h-full p-8">
      <CardHeader className="px-0 pt-0">
        <CardTitle className="font-bold text-2xl">
          Login to continue
        </CardTitle>
        <CardDescription>
          Use your email or another servise to continue
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-5 px-0 pb-0">
        <form className="space-y-2.5">
          <Label htmlFor="password" className="mb-0">Email</Label>
          <Input
            disabled={false}
            value={email}
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            required
          />
          <Label htmlFor="password" className="mb-0">Password</Label>
          <Input
            disabled={false}
            value={password}
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            required
          />
          <Button type="submit" className="w-full" size="lg" disabled={false}>Continue</Button>
        </form>

        <Separator />

        <div className="flex flex-col gap-y-2.5">
          <Button
            disabled={false}
            onClick={() => { }}
            variant="outline"
            size="lg"
            className="w-full relative"
          >
            <FcGoogle className="size-5" />
            Continue with Google</Button>
          <Button
            disabled={false}
            onClick={() => { }}
            variant="outline"
            size="lg"
            className="w-full relative"
          >
            <FaGithub className="size-5" />
            Continue with Github</Button>
        </div>

        <p className="text-xs text-muted-foreground">
          Don't have an account?
          <span
            onClick={() => setState("signUp")}
            className="text-sky-700 hover:underline cursor-pointer"
          >
            Sign up
          </span>
        </p>
      </CardContent>
    </Card>
  );
}

export default SignInCard;