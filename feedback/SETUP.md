# Invite-only preview: setup

About 10 minutes, on a computer. The Google Sheet you make here stores the visits, survey answers, notes and votes,
and it is also your dashboard. Until step 5 is done, the live app stays an open demo with no invite gate.

## 1. Make the Sheet and add the script
1. Go to **sheets.new** and name the sheet `WhereItsOn preview`.
2. In the sheet: **Extensions → Apps Script**. Delete the sample code, paste everything from
   [`feedback/Code.gs`](https://github.com/creativecatalyst1/WhereItsOn/blob/main/feedback/Code.gs), and click **Save**.

## 2. Create the tabs
1. Reload the sheet. A **WhereItsOn** menu appears next to Help.
2. **WhereItsOn → 1. Set up tabs.** The first time, Google asks for permission:
   **Continue → your account → Advanced → Go to (project name) → Allow.** The warning shows because the
   script is yours and unpublished.

## 3. Turn on the web address the app talks to
1. In Apps Script: **Deploy → New deployment →** gear icon **→ Web app**.
2. **Execute as: Me. Who has access: Anyone.** Click **Deploy** and copy the **Web app URL** (it ends in `/exec`).
   "Anyone" lets the app reach it. It answers only people with an active invite code.

## 4. Invite testers
1. In the **Invites** tab, type one name per row in column A (add yourself too).
2. **WhereItsOn → 2. Create invite links.** Each person gets a personal code and link in column C.
3. Send each person their link. They tap it and they are in, with no code to type.

## 5. Connect the app
Send the Web app URL to Claude to publish it, or set it yourself in `www/index.html`:
`const FEEDBACK_URL='https://script.google.com/macros/s/.../exec';`
From then on the app asks for an invite. Open your own invite link once on each of your devices.

## 6. Optional: let Claude screen comments
Without this, a blocked-words list screens comments. Links and contact details are always held.
1. Create an API key at **console.anthropic.com** (usage is billed: well under a cent per comment).
2. Apps Script → **Project Settings** (gear) → **Script properties → Add**: `CLAUDE_API_KEY` = your key.
3. **WhereItsOn → Test comment screening** to check it works.

Other optional script properties: `CLAUDE_MODEL` to pick another model (default `claude-opus-5-5`;
`claude-haiku-5-5` costs less), `BLOCKED_WORDS` to add words to the filter (comma separated).
If Claude declines to judge a comment, the request falls back to another Claude model automatically,
and if that also declines, the comment is held for you.

## Day to day
- **Dashboard**: testers who opened it, visits, average rating, "would use on game day", notes held for review.
- **Review held notes**: in **Feedback**, change **Status** from `Held` to `Visible` to publish, or `Hidden` to remove
  (works for any note).
- **Prioritize**: **Leaderboard** ranks visible notes by votes. Set **Stage** in Feedback (`Planned`, `In progress`,
  `Done`, `Won't do`) and testers see it on the in-app leaderboard.
- **Revoke someone**: untick **Active** in Invites. Their app locks on its next open.
- **After changing the script**: **Deploy → Manage deployments →** pencil **→ Version: New version → Deploy.**
  The URL stays the same.
