import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    tokenIdentifier: v.string(),
    model: v.union(v.literal("TAA-1.0-sonic"), v.literal("TAA-2.0-SuperSonic")),
    endsOn: v.optional(v.number()),
    subscriptionId: v.optional(v.string()),
  })
    .index("by_token", ["tokenIdentifier"])
    .index("by_subscriptionId", ["subscriptionId"]),
  chats: defineTable({
    userId: v.id("users"),
    title: v.string(),
  }).index("by_userId", ["userId"]),
  messages: defineTable({
    role: v.union(v.literal("user"), v.literal("assistant")),
    content: v.string(),
    chatId: v.id("chats"),
  }).index("by_chatId", ["chatId"]),
});
