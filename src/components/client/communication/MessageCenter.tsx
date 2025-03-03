import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  MessageSquare,
  Search,
  Send,
  CheckCircle2,
  Clock,
  AlertTriangle,
  PaperclipIcon,
  Plus,
} from "lucide-react";
import { conversations } from "@/data/communication";

const MessageCenter = () => {
  const [selectedConversation, setSelectedConversation] = useState(
    conversations[0],
  );
  const [messageText, setMessageText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredConversations = conversations.filter((conversation) =>
    conversation.subject.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge className="bg-blue-500 hover:bg-blue-600">
            <Clock className="h-3 w-3 mr-1" /> Active
          </Badge>
        );
      case "resolved":
        return (
          <Badge className="bg-green-500 hover:bg-green-600">
            <CheckCircle2 className="h-3 w-3 mr-1" /> Resolved
          </Badge>
        );
      case "pending":
        return (
          <Badge
            variant="outline"
            className="text-yellow-500 border-yellow-500"
          >
            <AlertTriangle className="h-3 w-3 mr-1" /> Pending
          </Badge>
        );
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  };

  const handleSendMessage = () => {
    if (messageText.trim() === "") return;
    // In a real app, this would send the message to the backend
    // For now, we'll just clear the input
    setMessageText("");
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Message Center</h2>
          <p className="text-muted-foreground">
            Communicate with delivery teams and support
          </p>
        </div>
        <Button className="bg-blue-500 hover:bg-blue-600">
          <Plus className="mr-2 h-4 w-4" /> New Conversation
        </Button>
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
        <Card className="md:col-span-1 bg-card border-blue-500/20">
          <CardHeader className="p-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search conversations..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="w-full justify-start rounded-none border-b border-border/30 bg-transparent p-0">
                <TabsTrigger
                  value="all"
                  className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-blue-500 data-[state=active]:bg-transparent"
                >
                  All
                </TabsTrigger>
                <TabsTrigger
                  value="active"
                  className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-blue-500 data-[state=active]:bg-transparent"
                >
                  Active
                </TabsTrigger>
                <TabsTrigger
                  value="resolved"
                  className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-blue-500 data-[state=active]:bg-transparent"
                >
                  Resolved
                </TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="m-0">
                <ScrollArea className="h-[calc(100vh-300px)] min-h-[400px]">
                  {filteredConversations.map((conversation) => (
                    <div
                      key={conversation.id}
                      className={`border-b border-border/30 p-4 cursor-pointer hover:bg-muted/50 ${selectedConversation.id === conversation.id ? "bg-muted" : ""}`}
                      onClick={() => setSelectedConversation(conversation)}
                    >
                      <div className="flex justify-between items-start mb-1">
                        <div className="font-medium">
                          {conversation.subject}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {formatDate(conversation.lastUpdated)}
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="text-sm text-muted-foreground">
                          Order: {conversation.orderId}
                        </div>
                        {getStatusBadge(conversation.status)}
                      </div>
                    </div>
                  ))}
                </ScrollArea>
              </TabsContent>

              <TabsContent value="active" className="m-0">
                <ScrollArea className="h-[calc(100vh-300px)] min-h-[400px]">
                  {filteredConversations
                    .filter((c) => c.status === "active")
                    .map((conversation) => (
                      <div
                        key={conversation.id}
                        className={`border-b border-border/30 p-4 cursor-pointer hover:bg-muted/50 ${selectedConversation.id === conversation.id ? "bg-muted" : ""}`}
                        onClick={() => setSelectedConversation(conversation)}
                      >
                        <div className="flex justify-between items-start mb-1">
                          <div className="font-medium">
                            {conversation.subject}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {formatDate(conversation.lastUpdated)}
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="text-sm text-muted-foreground">
                            Order: {conversation.orderId}
                          </div>
                          {getStatusBadge(conversation.status)}
                        </div>
                      </div>
                    ))}
                </ScrollArea>
              </TabsContent>

              <TabsContent value="resolved" className="m-0">
                <ScrollArea className="h-[calc(100vh-300px)] min-h-[400px]">
                  {filteredConversations
                    .filter((c) => c.status === "resolved")
                    .map((conversation) => (
                      <div
                        key={conversation.id}
                        className={`border-b border-border/30 p-4 cursor-pointer hover:bg-muted/50 ${selectedConversation.id === conversation.id ? "bg-muted" : ""}`}
                        onClick={() => setSelectedConversation(conversation)}
                      >
                        <div className="flex justify-between items-start mb-1">
                          <div className="font-medium">
                            {conversation.subject}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {formatDate(conversation.lastUpdated)}
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="text-sm text-muted-foreground">
                            Order: {conversation.orderId}
                          </div>
                          {getStatusBadge(conversation.status)}
                        </div>
                      </div>
                    ))}
                </ScrollArea>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card className="md:col-span-2 lg:col-span-3 bg-card border-blue-500/20 flex flex-col">
          <CardHeader className="pb-3">
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>{selectedConversation.subject}</CardTitle>
                <CardDescription>
                  Order: {selectedConversation.orderId} •{" "}
                  {getStatusBadge(selectedConversation.status)}
                </CardDescription>
              </div>
              <div>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-blue-500/30 hover:bg-blue-500/10"
                >
                  Mark as Resolved
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex-grow overflow-hidden p-0">
            <ScrollArea className="h-[calc(100vh-350px)] min-h-[350px] px-4">
              <div className="space-y-4 py-4">
                {selectedConversation.messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender.role === "client" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`flex max-w-[80%] ${message.sender.role === "client" ? "flex-row-reverse" : "flex-row"}`}
                    >
                      <Avatar
                        className={`h-8 w-8 ${message.sender.role === "client" ? "ml-2" : "mr-2"}`}
                      >
                        {message.sender.avatar ? (
                          <AvatarImage src={message.sender.avatar} />
                        ) : null}
                        <AvatarFallback>
                          {message.sender.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div
                          className={`rounded-lg p-3 ${message.sender.role === "client" ? "bg-blue-500 text-white" : message.sender.role === "system" ? "bg-muted" : "bg-card border border-border"}`}
                        >
                          <p className="text-sm">{message.content}</p>
                        </div>
                        <div
                          className={`mt-1 flex text-xs text-muted-foreground ${message.sender.role === "client" ? "justify-end" : "justify-start"}`}
                        >
                          <span>{message.sender.name}</span>
                          <span className="mx-1">•</span>
                          <span>{formatDate(message.timestamp)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
          <CardFooter className="border-t border-border/30 p-4">
            <div className="flex w-full items-center space-x-2">
              <Button
                variant="outline"
                size="icon"
                className="h-9 w-9 border-blue-500/30 hover:bg-blue-500/10"
              >
                <PaperclipIcon className="h-4 w-4 text-blue-500" />
              </Button>
              <Input
                placeholder="Type your message..."
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                className="flex-1"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
              />
              <Button
                className="bg-blue-500 hover:bg-blue-600"
                onClick={handleSendMessage}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default MessageCenter;
