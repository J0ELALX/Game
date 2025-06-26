const scenes = [
  {
    id: 0,
    text: "It's your first day at a new school. At lunch, you sit with a group of students. Jamie pulls out a vape and offers it to everyone. What do you do?",
    choices: [
      {
        text: 'Take the vape to fit in.',
        consequence: { health: -2, mental: -1, social: 2 },
        fact: 'Vapes contain harmful chemicals that can damage your lungs. (CDC)',
        next: 1,
        points: 0
      },
      {
        text: 'Politely refuse and suggest a game of basketball instead.',
        consequence: { health: 2, mental: 2, social: 1 },
        fact: 'Staying active and saying no to substances builds real strength! (WHO)',
        next: 1,
        points: 10
      },
      {
        text: 'Make a joke to change the subject.',
        consequence: { health: 1, mental: 1, social: 2 },
        fact: 'Changing the subject is a smart way to handle peer pressure. (UNICEF)',
        next: 1,
        points: 5
      },
      {
        text: 'Walk away and sit alone.',
        consequence: { health: 2, mental: 1, social: -2 },
        fact: 'Protecting your health is always a win, even if it feels tough.',
        next: 1,
        points: 5
      }
    ]
  },
  {
    id: 1,
    text: 'During gym class, you notice some students vaping in the locker room. They invite you to join and say, "It\'s not as bad as smoking." What do you do?',
    choices: [
      {
        text: "Join them to see what it's like.",
        consequence: { health: -2, mental: -1, social: 2 },
        fact: 'Vaping is not safe and can lead to addiction and lung injury. (CDC)',
        next: 2,
        points: 0
      },
      {
        text: 'Refuse and explain vaping is harmful.',
        consequence: { health: 2, mental: 2, social: 1 },
        fact: 'Standing up for your health can inspire others to do the same.',
        next: 2,
        points: 10
      },
      {
        text: 'Say you have asthma and can\'t be around vape.',
        consequence: { health: 2, mental: 1, social: 0 },
        fact: 'Secondhand vape aerosol can also harm people nearby. (CDC)',
        next: 2,
        points: 5
      },
      {
        text: 'Tell a teacher about the vaping.',
        consequence: { health: 1, mental: 1, social: -1 },
        fact: 'Reporting unsafe behavior helps keep everyone safe.',
        next: 2,
        points: 5
      }
    ]
  },
  {
    id: 2,
    text: 'A friend shows you a social media post claiming vaping is just flavored water. They ask if you want to try their new vape pen. What do you do?',
    choices: [
      {
        text: 'Try the vape because it sounds harmless.',
        consequence: { health: -2, mental: -1, social: 1 },
        fact: 'Vape aerosol contains nicotine and toxic chemicals, not just water. (CDC)',
        next: 3,
        points: 0
      },
      {
        text: 'Look up facts online and share the truth.',
        consequence: { health: 2, mental: 2, social: 2 },
        fact: 'Knowing the facts helps you and your friends make smart choices.',
        next: 3,
        points: 10
      },
      {
        text: "Tell your friend you're not interested.",
        consequence: { health: 2, mental: 1, social: 0 },
        fact: 'Refusing to try vaping protects your health and future.',
        next: 3,
        points: 10
      },
      {
        text: 'Change the subject to something fun.',
        consequence: { health: 1, mental: 1, social: 1 },
        fact: 'You can avoid pressure by steering the conversation elsewhere.',
        next: 3,
        points: 5
      }
    ]
  },
  {
    id: 3,
    text: 'You\'re at a school event. Someone offers you a vape and says, "Everyone here does it." You notice a younger student watching. What do you do?',
    choices: [
      {
        text: 'Take the vape to fit in with the crowd.',
        consequence: { health: -2, mental: -1, social: 2 },
        fact: 'Most teens do NOT vape. Don\'t believe the hype! (CDC)',
        next: 4,
        points: 0
      },
      {
        text: 'Refuse and talk to the younger student about making healthy choices.',
        consequence: { health: 2, mental: 2, social: 2 },
        fact: 'Being a positive role model helps others stay strong too.',
        next: 4,
        points: 10
      },
      {
        text: 'Say you have to leave and walk away.',
        consequence: { health: 1, mental: 1, social: 0 },
        fact: 'Walking away from pressure is always a smart move.',
        next: 4,
        points: 5
      },
      {
        text: 'Tell a teacher or event organizer.',
        consequence: { health: 1, mental: 1, social: -1 },
        fact: 'Reporting helps keep your school safe for everyone.',
        next: 4,
        points: 5
      }
    ]
  },
  {
    id: 4,
    text: "Your best friend confides that they're struggling to quit vaping and ask for your help. What do you do?",
    choices: [
      {
        text: 'Encourage them and offer to do healthy activities together.',
        consequence: { health: 2, mental: 2, social: 2 },
        fact: 'Support from friends makes quitting easier. (CDC)',
        next: 5,
        points: 10
      },
      {
        text: "Tell them it's not a big deal.",
        consequence: { health: -1, mental: -2, social: -1 },
        fact: 'Vaping is addictive and quitting is important for health.',
        next: 5,
        points: 0
      },
      {
        text: 'Ignore their message.',
        consequence: { health: -1, mental: -2, social: -2 },
        fact: 'Friends need support, especially when making tough choices.',
        next: 5,
        points: 0
      },
      {
        text: 'Help them find resources to quit.',
        consequence: { health: 2, mental: 2, social: 2 },
        fact: 'There are many ways to get help, like talking to a counselor or using quitlines.',
        next: 5,
        points: 10
      }
    ]
  },
  {
    id: 5,
    text: "It's the end of the school year. You reflect on your choices and how you've helped others avoid vaping. How do you want to make a difference next year?",
    choices: [
      {
        text: 'Start a club to educate others about vaping.',
        consequence: { health: 2, mental: 2, social: 2 },
        fact: 'Being a leader inspires others to make smart choices too!',
        next: 6,
        points: 10
      },
      {
        text: 'Support friends who are trying to quit.',
        consequence: { health: 1, mental: 2, social: 2 },
        fact: 'Kindness and support make a big impact.',
        next: 6,
        points: 10
      },
      {
        text: 'Share what you learned with your family.',
        consequence: { health: 1, mental: 2, social: 1 },
        fact: 'Talking about healthy choices helps everyone.',
        next: 6,
        points: 5
      },
      {
        text: 'Keep making smart choices for yourself.',
        consequence: { health: 2, mental: 2, social: 1 },
        fact: 'Your future is bright when you choose health and confidence!',
        next: 6,
        points: 10
      }
    ]
  }
];

export default scenes; 