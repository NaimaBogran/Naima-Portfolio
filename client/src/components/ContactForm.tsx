import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertMessageSchema, type InsertMessage } from "@shared/schema";
import { useSendMessage } from "@/hooks/use-messages";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Send, Loader2, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const { mutate, isPending } = useSendMessage();

  const form = useForm<InsertMessage>({
    resolver: zodResolver(insertMessageSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  function onSubmit(data: InsertMessage) {
    mutate(data, {
      onSuccess: () => {
        form.reset();
        setSubmitted(true);
      },
    });
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="w-full max-w-lg mx-auto bg-card border border-border/70 dark:border-border p-8 rounded-2xl shadow-lg dark:shadow-primary/5"
    >
      <h3 className="text-2xl font-bold font-display mb-6">Get in Touch</h3>

      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="confirmation"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.35 }}
            className="flex flex-col items-center justify-center gap-4 py-10 text-center"
            data-testid="confirmation-message"
          >
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <div>
              <p className="text-xl font-semibold font-display mb-1">Message received!</p>
              <p className="text-muted-foreground">Thanks! I'll be in touch soon.</p>
            </div>
            <Button
              variant="ghost"
              className="mt-2 text-sm text-muted-foreground hover:text-foreground"
              onClick={() => setSubmitted(false)}
              data-testid="button-send-another"
            >
              Send another message
            </Button>
          </motion.div>
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Your name"
                          className="h-12 bg-background/50 dark:bg-input border-border/60 dark:border-border focus:border-primary/60 dark:focus:border-primary/80 transition-all"
                          data-testid="input-name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="your.email@example.com"
                          type="email"
                          className="h-12 bg-background/50 dark:bg-input border-border/60 dark:border-border focus:border-primary/60 dark:focus:border-primary/80 transition-all"
                          data-testid="input-email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="How can I help you?"
                          className="min-h-[120px] resize-none bg-background/50 dark:bg-input border-border/60 dark:border-border focus:border-primary/60 dark:focus:border-primary/80 transition-all"
                          data-testid="input-message"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  disabled={isPending}
                  className="w-full h-12 text-lg font-medium shadow-lg hover:shadow-primary/25 transition-all"
                  data-testid="button-submit"
                >
                  {isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
