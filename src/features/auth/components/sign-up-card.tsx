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
import { FormEvent, useState } from "react";
import { Label } from "@/components/ui/label";
import { signIn } from "next-auth/react";
import { TriangleAlert } from "lucide-react";



interface SignUpCardProps {
  setState: (state: SignInFlow) => void;
}

const SignInCard = ({ setState }: SignUpCardProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCredentialsSignUp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords dont match")
      return
    }

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password })
      })

      const data = await response.json()

      if (response.ok) {
        signIn("credentials", { email, password })
      } else {
        setError("Signup failed. Please try again.")
      }
    } catch (err) {
      console.log("[ERROR]: ", err)
    }

  }

  const handleProviderSignUp = (value: "google" | "github") => {
    setIsLoading(true);
    signIn(value, { redirectTo: "/" })
  }

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

      {!!error && (
        <div className="bg-destructive/10 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6">
          <TriangleAlert className="size-4" />
          <p>{error}</p>
        </div>
      )}

      <CardContent className="space-y-5 px-0 pb-0">
        <form onSubmit={handleCredentialsSignUp} className="space-y-2.5">
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
          <Button type="submit" className="w-full" size="lg" disabled={isLoading}>Continue</Button>
        </form>

        <Separator />

        <div className="flex flex-col gap-y-2.5">
          <Button
            disabled={isLoading}
            onClick={() => handleProviderSignUp("google")}
            variant="outline"
            size="lg"
            className="w-full relative"
          >
            <FcGoogle className="size-5" />
            Continue with Google</Button>
          <Button
            disabled={isLoading}
            onClick={() => handleProviderSignUp("github")}
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