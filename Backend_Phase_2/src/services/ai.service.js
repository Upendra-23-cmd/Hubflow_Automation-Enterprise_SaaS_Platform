class AIService {
  async suggestMessage({ prompt, category = 'promotion', tone = 'professional' }) {
    // Template suggestions based on campaign intent
    const templates = {
      promotion: [
        `Hi {name}! Special offer for you: Get 20% off your next renewal with code SAVE20. Claim here: https://hubflow.io/offer`,
        `Hello {name}, check out our new automation tools designed to simplify your workflow! Learn more: https://hubflow.io`,
      ],
      reminder: [
        `Hi {name}, just a quick reminder about your scheduled demo with our team tomorrow. Reply YES to confirm.`,
        `Hello {name}, your trial expires in 2 days. Upgrade your account today to keep your campaigns running.`,
      ],
      welcome: [
        `Welcome aboard, {name}! We're thrilled to have you with us. Check out our quickstart guide to get started.`,
        `Hi {name}, thanks for joining Hubflow! Feel free to reach out if you have any questions.`,
      ],
    };

    const categoryTemplates = templates[category.toLowerCase()] || templates.promotion;
    const selectedMessage = categoryTemplates[Math.floor(Math.random() * categoryTemplates.length)];

    return {
      prompt,
      category,
      tone,
      suggestedMessage: selectedMessage,
      variations: [
        `Hey {name}, boost your campaign performance today with Hubflow's latest tools!`,
        `Hi {name}, discover simple ways to automate your outreach with Hubflow.`,
      ],
    };
  }
}

module.exports = new AIService();
