INSERT INTO public."QuizQuestion" (
  section, 
  question, 
  "contextHint", 
  type, 
  "maxSelect", 
  "order",
  "createdAt",
  "updatedAt"
) VALUES
  -- SECTION 1: ABOUT THEM
  (
    'About Them',
    'What kind of gestures make {name} happiest?',
    '{"Romantic partner": "Picture {name} at their happiest with you. Maybe you just did something unexpected for them — a surprise note, a random gift, a quiet moment together. What was it about that gesture that lit up their face?", "Friend": "Think of a time {name} was really touched by something you or someone else did for them. What kind of gesture was it — something heartfelt, useful, fun, or comforting?", "Family member": "Think about what makes {name} feel most appreciated in your family. Is it when someone remembers the little things, takes care of something practical, or plans something special?", "Myself": "Think about what truly makes you happy when someone does something for you. What kind of gesture leaves you feeling genuinely seen and valued?"}',
    'choice',
    1,
    1,
    NOW(),
    NOW()
  ),
  (
    'About Them',
    'When {name} receives a gift, what matters most to {them}?',
    '{"Romantic partner": "Think back to the last gift {name} truly loved from you. Was it the thought behind it that moved them? The fact that it was useful? How it made them feel? Hold that memory — what stood out?", "Friend": "Remember a time {name} received a gift and genuinely loved it — maybe from you, maybe someone else. What was it about that gift that made it land so perfectly?", "Family member": "Recall a holiday or birthday when {name} opened something and their whole face changed. What made that gift hit different — the thought, the beauty, or the usefulness?", "Myself": "Think about the best gift you''ve ever received. What was it about that gift that made it stand out — the meaning, the beauty, or how much you used it?"}',
    'choice',
    2,
    2,
    NOW(),
    NOW()
  ),
  (
    'About Them',
    'Which words describe {name} best?',
    '{"Romantic partner": "Close your eyes for a second and picture {name} in their element — being fully themselves around you. How would you describe the energy they bring into your relationship?", "Friend": "If you had to describe {name} to someone who''s never met them, what would you say? Think about their vibe, how they show up, and what makes them uniquely them.", "Family member": "Think about what makes {name} who they are in your family. Are they the emotional one, the practical one, the stylish one, or the adventurous soul?", "Myself": "If your closest person had to describe you in a few words, what would they say? Think about how you move through the world and what drives you."}',
    'choice',
    2,
    3,
    NOW(),
    NOW()
  ),
  (
    'About Them',
    'What''s your biggest fear when gifting {name}?',
    '{"Romantic partner": "Be honest with yourself — when you think about getting a gift for {name}, what''s that little voice in your head worried about? What would hurt the most if you got it wrong?", "Friend": "Gifting a friend can feel tricky. What''s the thing you''d hate most — getting something they won''t use, or something that doesn''t feel personal enough?", "Family member": "Sometimes gifting family is the hardest. What''s the one thing you''d hate to hear after {name} opens your gift?", "Myself": "When you treat yourself, what usually goes wrong? Do you pick something boring, something impractical, or do you never quite feel like you deserve the nice thing?"}',
    'choice',
    1,
    4,
    NOW(),
    NOW()
  ),
  -- SECTION 2: HOW THEY EXPERIENCE GIFTS
  (
    'How They Experience Gifts',
    'What excites {name} the most?',
    '{"Romantic partner": "Imagine surprising {name} — you walk in with something just for them. What would make their eyes light up first? Think about what senses they respond to most when they''re excited.", "Friend": "Picture handing {name} a surprise gift bag. What would they reach for first? What kinds of things make them go ''Oh my God, I love this!''?", "Family member": "Think about what gets {name} genuinely excited. Is it unwrapping something beautiful, smelling something amazing, tasting something special, or the story behind the gift?", "Myself": "What makes your heart race when you open a gift? Is it the visual beauty, the texture, the scent, or the fact that someone remembered something meaningful about you?"}',
    'choice',
    2,
    5,
    NOW(),
    NOW()
  ),
  (
    'How They Experience Gifts',
    'What would make this Valentine truly special for {name}?',
    '{"Romantic partner": "Imagine it''s Valentine''s evening. You''ve just given {name} the perfect gift. They look at you and say ''This is the best Valentine I''ve ever had.'' What did you give them that made them say that?", "Friend": "Imagine {name} posting about your gift on social media saying ''My friend really outdid themselves this time.'' What kind of gift would make them feel that way?", "Family member": "Think about the kind of gift that would make {name} tear up or call the whole family to tell them about it. What would that gift be like?", "Myself": "If you could give yourself the perfect Valentine''s treat with no guilt — something that says ''I deserve this'' — what would that look like?"}',
    'choice',
    1,
    6,
    NOW(),
    NOW()
  ),
  -- SECTION 3: YOU
  (
    'You',
    'How involved do you want to be in creating this gift?',
    '{"Romantic partner": "Some people love curating every detail of a gift — picking the wrapping, writing the note, putting it all together. Others just want it done right without the stress. Which one sounds more like you?", "Friend": "When it comes to gift-giving, are you the DIY type who loves the creative process, or would you rather someone just tell you exactly what to get?", "Family member": "Be honest — do you enjoy the process of finding the perfect gift, or does it usually feel like a stressful chore you''d love help with?", "Myself": "When treating yourself, do you enjoy the hunt and the choosing, or would you prefer someone to just hand you the perfect thing?"}',
    'choice',
    1,
    7,
    NOW(),
    NOW()
  ),
  (
    'You',
    'What''s your budget style for this gift?',
    '{"Romantic partner": "There''s no wrong answer here — a meaningful gift doesn''t have to be expensive. But knowing your budget style helps us suggest things that feel right for you and {name}.", "Friend": "Gifts between friends come in all sizes. Are you going all out for {name} this Valentine, or keeping it thoughtful and budget-friendly?", "Family member": "Whether it''s a small token of love or a grand gesture, what feels right for what you want to give {name} this Valentine?", "Myself": "How much are you willing to invest in yourself this Valentine? Remember, you deserve to be spoiled too."}',
    'choice',
    1,
    8,
    NOW(),
    NOW()
  ),
  (
    'You',
    'When do you need this gift ready?',
    '{"Romantic partner": "Timing matters! Are you planning ahead or is this a last-minute rescue mission? No judgment either way — we''ve got you covered.", "Friend": "When are you seeing {name} next? Let us know so we can suggest gifts that are actually doable in your timeline.", "Family member": "Are you planning ahead for {name} or do you need something sorted quickly? Knowing this helps us match realistic options to your timeline.", "Myself": "When do you want to treat yourself? Right now, on the day, or as a post-Valentine reward?"}',
    'choice',
    1,
    9,
    NOW(),
    NOW()
  ),
  (
    'You',
    'Anything else we should know about {name}?',
    '{"Romantic partner": "This is your space to tell us the little things — their favourite colour, an inside joke, something they mentioned wanting, a hobby they love. The more we know, the more personal the gift can be.", "Friend": "Drop any extra details about {name} here — their interests, something they''ve been talking about, a quirky habit. Anything that could help us nail the perfect gift.", "Family member": "Share anything extra about {name} — their hobbies, something they''ve been eyeing, a favourite treat. These little details make all the difference.", "Myself": "Tell us about yourself — your interests, something you''ve been wanting, what makes you feel special. The more we know, the better the recommendation."}',
    'freetext',
    0,
    10,
    NOW(),
    NOW()
  );

-- Combined INSERT for all questions
INSERT INTO public."QuizOption" ("questionId",label, styles, "order","updatedAt") VALUES
-- Question 1
(1, 'Something emotional or personal', 'Soft & Sentimental', 1, now()),
(1, 'Something useful or thoughtful', 'Thoughtful & Practical', 2, now()),
(1, 'Something that helps them relax', 'Comfort & Care', 3,now()),
(1, 'Something stylish or classy', 'Stylish & Aesthetic', 4,now()),
(1, 'A special experience or surprise', 'Experiential & Immersive', 5,now()),

-- Question 2
(2, 'The meaning behind it', 'Soft & Sentimental', 1,now()),
(2, 'How useful it is', 'Thoughtful & Practical', 2,now()),
(2, 'How comforting it feels', 'Comfort & Care', 3,now()),
(2, 'How beautiful it looks', 'Stylish & Aesthetic', 4,now()),
(2, 'The experience or memory it creates', 'Experiential & Immersive', 5,now()),

-- Question 3
(3, 'Emotional & sentimental', 'Soft & Sentimental', 1,now()),
(3, 'Practical & intentional', 'Thoughtful & Practical', 2,now()),
(3, 'Gentle & nurturing', 'Comfort & Care', 3,now()),
(3, 'Stylish & sophisticated', 'Stylish & Aesthetic', 4,now()),
(3, 'Adventurous & expressive', 'Experiential & Immersive', 5,now()),

-- Question 4
(4, 'It won''t feel meaningful enough', 'Soft & Sentimental', 1,now()),
(4, 'It won''t be useful to them', 'Thoughtful & Practical', 2,now()),
(4, 'It won''t feel caring or warm', 'Comfort & Care', 3,now()),
(4, 'It won''t match their taste or style', 'Stylish & Aesthetic', 4,now()),
(4, 'It won''t feel special or memorable', 'Experiential & Immersive', 5,now()),

-- Question 5
(5, 'Beautiful packaging or visuals', 'Stylish & Aesthetic', 1,now()),
(5, 'Physical comfort or texture', 'Comfort & Care', 2,now()),
(5, 'Food or sweet treats', 'Comfort & Care,Thoughtful & Practical', 3,now()),
(5, 'Scents, perfumes, candles', 'Stylish & Aesthetic,Comfort & Care', 4,now()),
(5, 'Music, voice notes, sound', 'Soft & Sentimental,Experiential & Immersive', 5,now()),
(5, 'Memories & meaning', 'Soft & Sentimental', 6,now()),

-- Question 6
(6, 'A heartfelt, personal message', 'Soft & Sentimental', 1,now()),
(6, 'Something personalized just for them', 'Soft & Sentimental,Thoughtful & Practical', 2,now()),
(6, 'Something they''ll use often', 'Thoughtful & Practical', 3,now()),
(6, 'Something that helps them rest and recharge', 'Comfort & Care', 4,now()),
(6, 'Something stylish & luxurious', 'Stylish & Aesthetic', 5,now()),
(6, 'A memorable, one-of-a-kind experience', 'Experiential & Immersive', 6,now()),

-- Question 7
(7, 'I want to curate it myself (with guidance)', 'Soft & Sentimental,Thoughtful & Practical', 1,now()),
(7, 'I want help so I don''t mess it up', 'Comfort & Care,Stylish & Aesthetic', 2,now()),
(7, 'I want everything handled for me', 'Experiential & Immersive,Stylish & Aesthetic', 3,now()),

-- Question 8
(8, 'I want to go all out', 'Experiential & Immersive,Stylish & Aesthetic', 1,now()),
(8, 'I want something balanced — quality but reasonable', 'Thoughtful & Practical,Comfort & Care', 2,now()),
(8, 'I want something simple but meaningful', 'Soft & Sentimental,Comfort & Care', 3,now()),

-- Question 9
(9, 'ASAP — I need it now!', 'Experiential & Immersive', 1,now()),
(9, 'Before Valentine''s Day', 'Thoughtful & Practical', 2,now()),
(9, 'On Valentine''s Day itself', 'Soft & Sentimental', 3,now()),
(9, 'After Valentine''s — no rush', 'Comfort & Care', 4,now());