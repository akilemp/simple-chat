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


interface SignUpCardProps {
  setState: (state: SignInFlow) => void;
}

const SignInCard = ({ setState }: SignUpCardProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <Card className="w-full h-full p-8">
      <CardHeader className="px-0 pt-0">
        <CardTitle className="font-bold text-2xl">
          Sign up to continue
        </CardTitle>
        <CardDescription>
          Use your email or another servise to continue
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-5 px-0 pb-0">
        <form className="space-y-2.5">
          <Label htmlFor="email" className="mb-0">Email</Label>
          <Input
            disabled={false}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email"
            type="email"
            required
            id="email"
          />
          <Label htmlFor="password" className="mb-0">Password</Label>
          <Input
            disabled={false}
            value={password}
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            required
            id="password"
          />
          <Label htmlFor="confirmPassword" className="mb-0">Confirm password</Label>
          <Input
            disabled={false}
            value={confirmPassword}
            placeholder="confirm password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            type="password"
            required
            id="confirmPassword"
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
          Already have an account?
          <span
            onClick={() => setState("signIn")}
            className="text-sky-700 hover:underline cursor-pointer pl-1"
          >
            Sign in
          </span>
        </p>
      </CardContent>
    </Card>
  );
}

export default SignInCard;