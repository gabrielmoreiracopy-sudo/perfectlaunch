"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { prisma } from "@/lib/db";
import { assertAdmin } from "@/lib/auth";
import { toDate, toNumber, toText } from "@/lib/utils";

function projectId(formData: FormData) {
  return toText(formData.get("projectId"));
}

export async function createProject(formData: FormData) {
  await assertAdmin();

  const project = await prisma.project.create({
    data: {
      name: toText(formData.get("name")),
      expert: toText(formData.get("expert")),
      product: toText(formData.get("product")),
      launchType: toText(formData.get("launchType")),
      logoUrl: toText(formData.get("logoUrl")),
      notes: toText(formData.get("notes")),
      status: toText(formData.get("status")) || "Pendente",
      revenueGoal: toNumber(formData.get("revenueGoal")),
      leadsGoal: Math.round(toNumber(formData.get("leadsGoal"))),
      budget: toNumber(formData.get("budget")),
      startDate: toDate(formData.get("startDate")),
      openCartDate: toDate(formData.get("openCartDate")),
      closeCartDate: toDate(formData.get("closeCartDate")),
      strategy: { create: { niche: toText(formData.get("niche")) } },
      offer: { create: {} },
      contents: {
        create: ["CPL1", "CPL2", "CPL3", "VSL"].map((type) => ({ type }))
      }
    }
  });

  revalidatePath("/");
  revalidatePath("/projects");
  redirect("/projects");
}

export async function updateProject(formData: FormData) {
  await assertAdmin();

  const id = projectId(formData);
  await prisma.project.update({
    where: { id },
    data: {
      name: toText(formData.get("name")),
      expert: toText(formData.get("expert")),
      product: toText(formData.get("product")),
      launchType: toText(formData.get("launchType")),
      logoUrl: toText(formData.get("logoUrl")),
      notes: toText(formData.get("notes")),
      status: toText(formData.get("status")),
      revenueGoal: toNumber(formData.get("revenueGoal")),
      leadsGoal: Math.round(toNumber(formData.get("leadsGoal"))),
      budget: toNumber(formData.get("budget")),
      startDate: toDate(formData.get("startDate")),
      openCartDate: toDate(formData.get("openCartDate")),
      closeCartDate: toDate(formData.get("closeCartDate"))
    }
  });
  revalidatePath("/");
  revalidatePath("/projects");
}

export async function deleteProject(formData: FormData) {
  await assertAdmin();

  await prisma.project.delete({ where: { id: projectId(formData) } });
  revalidatePath("/");
  revalidatePath("/projects");
  redirect("/projects");
}

export async function upsertStrategy(formData: FormData) {
  await assertAdmin();

  const id = projectId(formData);
  await prisma.strategy.upsert({
    where: { projectId: id },
    update: {
      niche: toText(formData.get("niche")),
      avatar: toText(formData.get("avatar")),
      pains: toText(formData.get("pains")),
      desires: toText(formData.get("desires")),
      objections: toText(formData.get("objections")),
      promise: toText(formData.get("promise"))
    },
    create: {
      projectId: id,
      niche: toText(formData.get("niche")),
      avatar: toText(formData.get("avatar")),
      pains: toText(formData.get("pains")),
      desires: toText(formData.get("desires")),
      objections: toText(formData.get("objections")),
      promise: toText(formData.get("promise"))
    }
  });
  revalidatePath("/strategy");
}

export async function upsertOffer(formData: FormData) {
  await assertAdmin();

  const id = projectId(formData);
  await prisma.offer.upsert({
    where: { projectId: id },
    update: {
      name: toText(formData.get("name")),
      deliverables: toText(formData.get("deliverables")),
      bonuses: toText(formData.get("bonuses")),
      price: toNumber(formData.get("price")),
      guarantee: toText(formData.get("guarantee")),
      mechanism: toText(formData.get("mechanism"))
    },
    create: {
      projectId: id,
      name: toText(formData.get("name")),
      deliverables: toText(formData.get("deliverables")),
      bonuses: toText(formData.get("bonuses")),
      price: toNumber(formData.get("price")),
      guarantee: toText(formData.get("guarantee")),
      mechanism: toText(formData.get("mechanism"))
    }
  });
  revalidatePath("/offer");
}

export async function saveContent(formData: FormData) {
  await assertAdmin();

  await prisma.content.update({
    where: { id: toText(formData.get("id")) },
    data: {
      objective: toText(formData.get("objective")),
      script: toText(formData.get("script")),
      cta: toText(formData.get("cta")),
      status: toText(formData.get("status"))
    }
  });
  revalidatePath("/content");
}

export async function createCreative(formData: FormData) {
  await assertAdmin();

  await prisma.creative.create({
    data: {
      projectId: projectId(formData),
      name: toText(formData.get("name")),
      platform: toText(formData.get("platform")),
      format: toText(formData.get("format")),
      angle: toText(formData.get("angle")),
      hook: toText(formData.get("hook")),
      copy: toText(formData.get("copy")),
      link: toText(formData.get("link")),
      status: toText(formData.get("status"))
    }
  });
  revalidatePath("/acquisition");
}

export async function updateCreative(formData: FormData) {
  await assertAdmin();

  await prisma.creative.update({
    where: { id: toText(formData.get("id")) },
    data: {
      name: toText(formData.get("name")),
      platform: toText(formData.get("platform")),
      format: toText(formData.get("format")),
      angle: toText(formData.get("angle")),
      hook: toText(formData.get("hook")),
      copy: toText(formData.get("copy")),
      link: toText(formData.get("link")),
      status: toText(formData.get("status"))
    }
  });
  revalidatePath("/acquisition");
}

export async function createPage(formData: FormData) {
  await assertAdmin();

  await prisma.page.create({
    data: {
      projectId: projectId(formData),
      name: toText(formData.get("name")),
      url: toText(formData.get("url")),
      status: toText(formData.get("status"))
    }
  });
  revalidatePath("/funnel");
}

export async function updatePage(formData: FormData) {
  await assertAdmin();

  await prisma.page.update({
    where: { id: toText(formData.get("id")) },
    data: {
      name: toText(formData.get("name")),
      url: toText(formData.get("url")),
      status: toText(formData.get("status"))
    }
  });
  revalidatePath("/funnel");
}

export async function createTrackingLink(formData: FormData) {
  await assertAdmin();

  await prisma.trackingLink.create({
    data: {
      projectId: projectId(formData),
      name: toText(formData.get("name")),
      url: toText(formData.get("url")),
      utmSource: toText(formData.get("utmSource")),
      utmMedium: toText(formData.get("utmMedium")),
      utmCampaign: toText(formData.get("utmCampaign"))
    }
  });
  revalidatePath("/funnel");
}

export async function updateTrackingLink(formData: FormData) {
  await assertAdmin();

  await prisma.trackingLink.update({
    where: { id: toText(formData.get("id")) },
    data: {
      name: toText(formData.get("name")),
      url: toText(formData.get("url")),
      utmSource: toText(formData.get("utmSource")),
      utmMedium: toText(formData.get("utmMedium")),
      utmCampaign: toText(formData.get("utmCampaign"))
    }
  });
  revalidatePath("/funnel");
}

export async function createMessage(formData: FormData) {
  await assertAdmin();

  await prisma.message.create({
    data: {
      projectId: projectId(formData),
      channel: toText(formData.get("channel")),
      phase: toText(formData.get("phase")),
      objective: toText(formData.get("objective")),
      content: toText(formData.get("content")),
      cta: toText(formData.get("cta")),
      link: toText(formData.get("link")),
      sendDate: toDate(formData.get("sendDate"))
    }
  });
  revalidatePath("/communication");
}

export async function updateMessage(formData: FormData) {
  await assertAdmin();

  await prisma.message.update({
    where: { id: toText(formData.get("id")) },
    data: {
      channel: toText(formData.get("channel")),
      phase: toText(formData.get("phase")),
      objective: toText(formData.get("objective")),
      content: toText(formData.get("content")),
      cta: toText(formData.get("cta")),
      link: toText(formData.get("link")),
      sendDate: toDate(formData.get("sendDate"))
    }
  });
  revalidatePath("/communication");
}

export async function createLead(formData: FormData) {
  await assertAdmin();

  await prisma.lead.create({
    data: {
      projectId: projectId(formData),
      name: toText(formData.get("name")),
      contact: toText(formData.get("contact")),
      status: toText(formData.get("status")),
      temperature: toText(formData.get("temperature")),
      objection: toText(formData.get("objection")),
      notes: toText(formData.get("notes"))
    }
  });
  revalidatePath("/recovery");
}

export async function updateLead(formData: FormData) {
  await assertAdmin();

  await prisma.lead.update({
    where: { id: toText(formData.get("id")) },
    data: {
      name: toText(formData.get("name")),
      contact: toText(formData.get("contact")),
      status: toText(formData.get("status")),
      temperature: toText(formData.get("temperature")),
      objection: toText(formData.get("objection")),
      notes: toText(formData.get("notes"))
    }
  });
  revalidatePath("/recovery");
}

export async function createFileLink(formData: FormData) {
  await assertAdmin();

  await prisma.fileLink.create({
    data: {
      projectId: projectId(formData),
      name: toText(formData.get("name")),
      type: toText(formData.get("type")),
      url: toText(formData.get("url")),
      description: toText(formData.get("description"))
    }
  });
  revalidatePath("/files");
}

export async function updateFileLink(formData: FormData) {
  await assertAdmin();

  await prisma.fileLink.update({
    where: { id: toText(formData.get("id")) },
    data: {
      name: toText(formData.get("name")),
      type: toText(formData.get("type")),
      url: toText(formData.get("url")),
      description: toText(formData.get("description"))
    }
  });
  revalidatePath("/files");
}

export async function deleteRecord(formData: FormData) {
  await assertAdmin();

  const model = toText(formData.get("model"));
  const id = toText(formData.get("id"));

  if (model === "creative") await prisma.creative.delete({ where: { id } });
  if (model === "page") await prisma.page.delete({ where: { id } });
  if (model === "trackingLink") await prisma.trackingLink.delete({ where: { id } });
  if (model === "message") await prisma.message.delete({ where: { id } });
  if (model === "lead") await prisma.lead.delete({ where: { id } });
  if (model === "fileLink") await prisma.fileLink.delete({ where: { id } });

  revalidatePath("/");
}
