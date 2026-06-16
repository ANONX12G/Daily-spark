import { useState, useCallback } from "react";

const QUOTES = [
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs", category: "Motivation" },
  { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt", category: "Motivation" },
  { text: "It always seems impossible until it's done.", author: "Nelson Mandela", category: "Motivation" },
  { text: "All our dreams can come true if we have the courage to pursue them.", author: "Walt Disney", category: "Motivation" },
  { text: "The secret of getting ahead is getting started.", author: "Mark Twain", category: "Motivation" },
  { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill", category: "Motivation" },
  { text: "You miss 100% of the shots you don't take.", author: "Wayne Gretzky", category: "Motivation" },
  { text: "Do one thing every day that scares you.", author: "Eleanor Roosevelt", category: "Motivation" },
  { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt", category: "Motivation" },
  { text: "Keep your face always toward the sunshine and shadows will fall behind you.", author: "Walt Whitman", category: "Motivation" },
  { text: "The only impossible journey is the one you never begin.", author: "Tony Robbins", category: "Motivation" },
  { text: "Life is either a daring adventure or nothing at all.", author: "Helen Keller", category: "Motivation" },
  { text: "Never let the fear of striking out keep you from playing the game.", author: "Babe Ruth", category: "Motivation" },
  { text: "You will face many defeats in life, but never let yourself be defeated.", author: "Maya Angelou", category: "Motivation" },
  { text: "The greatest glory in living lies not in never falling, but in rising every time we fall.", author: "Nelson Mandela", category: "Motivation" },
  { text: "When you reach the end of your rope, tie a knot in it and hang on.", author: "Franklin D. Roosevelt", category: "Motivation" },
  { text: "It does not matter how slowly you go as long as you do not stop.", author: "Confucius", category: "Motivation" },
  { text: "Our greatest weakness lies in giving up. The most certain way to succeed is always to try just one more time.", author: "Thomas Edison", category: "Motivation" },
  { text: "You are never too old to set another goal or to dream a new dream.", author: "C.S. Lewis", category: "Motivation" },
  { text: "To see what is right and not do it is a lack of courage.", author: "Confucius", category: "Motivation" },
  { text: "Start where you are. Use what you have. Do what you can.", author: "Arthur Ashe", category: "Motivation" },
  { text: "With the new day comes new strength and new thoughts.", author: "Eleanor Roosevelt", category: "Motivation" },
  { text: "Energy and persistence conquer all things.", author: "Benjamin Franklin", category: "Motivation" },
  { text: "Limitations live only in our minds. But if we use our imaginations, our possibilities become limitless.", author: "Jamie Paolinetti", category: "Motivation" },
  { text: "You take your life in your own hands, and what happens? A terrible thing: no one to blame.", author: "Erica Jong", category: "Motivation" },
  { text: "What you get by achieving your goals is not as important as what you become by achieving your goals.", author: "Zig Ziglar", category: "Motivation" },
  { text: "When I stand before God at the end of my life, I would hope that I would not have a single bit of talent left.", author: "Erma Bombeck", category: "Motivation" },
  { text: "Few things can help an individual more than to place responsibility on him and to let him know that you trust him.", author: "Booker T. Washington", category: "Motivation" },
  { text: "Certain things catch your eye, but pursue only those that capture the heart.", author: "Ancient Indian Proverb", category: "Motivation" },
  { text: "Believe and act as if it were impossible to fail.", author: "Charles Kettering", category: "Motivation" },
  { text: "I have learned over the years that when one's mind is made up, this diminishes fear.", author: "Rosa Parks", category: "Motivation" },
  { text: "I am not a product of my circumstances. I am a product of my decisions.", author: "Stephen Covey", category: "Motivation" },
  { text: "Every child is an artist. The problem is how to remain an artist once he grows up.", author: "Pablo Picasso", category: "Motivation" },
  { text: "You can never cross the ocean until you have the courage to lose sight of the shore.", author: "Christopher Columbus", category: "Motivation" },
  { text: "I've learned that people will forget what you said, people will forget what you did, but people will never forget how you made them feel.", author: "Maya Angelou", category: "Motivation" },
  { text: "Either you run the day or the day runs you.", author: "Jim Rohn", category: "Motivation" },
  { text: "Whether you think you can or you think you can't, you're right.", author: "Henry Ford", category: "Motivation" },
  { text: "The two most important days in your life are the day you are born and the day you find out why.", author: "Mark Twain", category: "Motivation" },
  { text: "Whatever the mind of man can conceive and believe, it can achieve.", author: "Napoleon Hill", category: "Motivation" },
  { text: "Strive not to be a success, but rather to be of value.", author: "Albert Einstein", category: "Motivation" },
  { text: "In the middle of every difficulty lies opportunity.", author: "Albert Einstein", category: "Wisdom" },
  { text: "An unexamined life is not worth living.", author: "Socrates", category: "Wisdom" },
  { text: "Great minds discuss ideas; average minds discuss events; small minds discuss people.", author: "Eleanor Roosevelt", category: "Wisdom" },
  { text: "Well done is better than well said.", author: "Benjamin Franklin", category: "Wisdom" },
  { text: "No one can make you feel inferior without your consent.", author: "Eleanor Roosevelt", category: "Wisdom" },
  { text: "Life is what happens when you're busy making other plans.", author: "John Lennon", category: "Wisdom" },
  { text: "A person who never made a mistake never tried anything new.", author: "Albert Einstein", category: "Wisdom" },
  { text: "In the end, it's not the years in your life that count. It's the life in your years.", author: "Abraham Lincoln", category: "Wisdom" },
  { text: "If you look at what you have in life, you'll always have more.", author: "Oprah Winfrey", category: "Wisdom" },
  { text: "Happiness is not something ready-made. It comes from your own actions.", author: "Dalai Lama", category: "Wisdom" },
  { text: "If you want to live a happy life, tie it to a goal, not to people or things.", author: "Albert Einstein", category: "Wisdom" },
  { text: "Never let the fear of striking out keep you from playing the game.", author: "Babe Ruth", category: "Wisdom" },
  { text: "Money and success don't change people; they merely amplify what is already there.", author: "Will Smith", category: "Wisdom" },
  { text: "Your time is limited, so don't waste it living someone else's life.", author: "Steve Jobs", category: "Wisdom" },
  { text: "Not how long, but how well you have lived is the main thing.", author: "Seneca", category: "Wisdom" },
  { text: "If life were predictable it would cease to be life and be without flavor.", author: "Eleanor Roosevelt", category: "Wisdom" },
  { text: "The whole secret of a successful life is to find out what is one's destiny to do, and then do it.", author: "Henry Ford", category: "Wisdom" },
  { text: "In order to write about life first you must live it.", author: "Ernest Hemingway", category: "Wisdom" },
  { text: "The big lesson in life is never be scared of anyone or anything.", author: "Frank Sinatra", category: "Wisdom" },
  { text: "Sing like no one's listening, love like you've never been hurt, dance like nobody's watching.", author: "Mark Twain", category: "Wisdom" },
  { text: "Do not go where the path may lead; go instead where there is no path and leave a trail.", author: "Ralph Waldo Emerson", category: "Wisdom" },
  { text: "You will face many defeats in life, but never let yourself be defeated.", author: "Maya Angelou", category: "Wisdom" },
  { text: "The most common way people give up their power is by thinking they don't have any.", author: "Alice Walker", category: "Wisdom" },
  { text: "The mind is everything. What you think you become.", author: "Buddha", category: "Wisdom" },
  { text: "The best time to plant a tree was 20 years ago. The second best time is now.", author: "Chinese Proverb", category: "Wisdom" },
  { text: "An unexamined life is not worth living.", author: "Socrates", category: "Wisdom" },
  { text: "Spread love everywhere you go.", author: "Mother Teresa", category: "Love" },
  { text: "The best thing to hold onto in life is each other.", author: "Audrey Hepburn", category: "Love" },
  { text: "To love and be loved is to feel the sun from both sides.", author: "David Viscott", category: "Love" },
  { text: "Where there is love there is life.", author: "Mahatma Gandhi", category: "Love" },
  { text: "Being deeply loved by someone gives you strength.", author: "Lao Tzu", category: "Love" },
  { text: "Life is the flower for which love is the honey.", author: "Victor Hugo", category: "Love" },
  { text: "The best and most beautiful things in this world cannot be seen or even heard, but must be felt with the heart.", author: "Helen Keller", category: "Love" },
  { text: "You know you're in love when you can't fall asleep because reality is finally better than your dreams.", author: "Dr. Seuss", category: "Love" },
  { text: "Love is composed of a single soul inhabiting two bodies.", author: "Aristotle", category: "Love" },
  { text: "Love all, trust a few, do wrong to none.", author: "William Shakespeare", category: "Love" },
  { text: "The giving of love is an education in itself.", author: "Eleanor Roosevelt", category: "Love" },
  { text: "Love is not about how many days, months, or years you have been together. It is about how much you love each other every single day.", author: "Anonymous", category: "Love" },
  { text: "The most important thing in the world is family and love.", author: "John Wooden", category: "Love" },
  { text: "Love is when the other person's happiness is more important than your own.", author: "H. Jackson Brown Jr.", category: "Love" },
  { text: "A loving heart is the beginning of all knowledge.", author: "Thomas Carlyle", category: "Love" },
  { text: "Love is the bridge between two hearts.", author: "Anonymous", category: "Love" },
  { text: "Where there is great love, there are always miracles.", author: "Willa Cather", category: "Love" },
  { text: "Success usually comes to those who are too busy to be looking for it.", author: "Henry David Thoreau", category: "Success" },
  { text: "I have not failed. I've just found 10,000 ways that won't work.", author: "Thomas Edison", category: "Success" },
  { text: "Success is walking from failure to failure with no loss of enthusiasm.", author: "Winston Churchill", category: "Success" },
  { text: "Try not to become a person of success, but rather try to become a person of value.", author: "Albert Einstein", category: "Success" },
  { text: "Many of life's failures are people who did not realize how close they were to success when they gave up.", author: "Thomas Edison", category: "Success" },
  { text: "Don't be afraid to give up the good to go for the great.", author: "John D. Rockefeller", category: "Success" },
  { text: "I find that the harder I work, the more luck I seem to have.", author: "Thomas Jefferson", category: "Success" },
  { text: "Success is not the key to happiness. Happiness is the key to success.", author: "Albert Schweitzer", category: "Success" },
  { text: "The road to success and the road to failure are almost exactly the same.", author: "Colin R. Davis", category: "Success" },
  { text: "There are no secrets to success. It is the result of preparation, hard work, and learning from failure.", author: "Colin Powell", category: "Success" },
  { text: "Success seems to be connected with action. Successful people keep moving.", author: "Conrad Hilton", category: "Success" },
  { text: "It is better to fail in originality than to succeed in imitation.", author: "Herman Melville", category: "Success" },
  { text: "The secret of success is to do the common thing uncommonly well.", author: "John D. Rockefeller Jr.", category: "Success" },
  { text: "I never dreamed about success. I worked for it.", author: "Estee Lauder", category: "Success" },
  { text: "Success is the sum of small efforts repeated day in and day out.", author: "Robert Collier", category: "Success" },
  { text: "If you want to achieve greatness, stop asking for permission.", author: "Anonymous", category: "Success" },
  { text: "Things work out best for those who make the best of how things work out.", author: "John Wooden", category: "Success" },
  { text: "To live a creative life, we must lose our fear of being wrong.", author: "Anonymous", category: "Success" },
  { text: "If you are not willing to risk the usual, you will have to settle for the ordinary.", author: "Jim Rohn", category: "Success" },
  { text: "Successful entrepreneurs are givers and not takers of positive energy.", author: "Anonymous", category: "Success" },
];

const FACTS = [
  { text: "Honey never spoils. Archaeologists have found 3,000-year-old honey in Egyptian tombs that was still perfectly edible and delicious.", emoji: "🍯" },
  { text: "A group of flamingos is called a flamboyance. These beautiful pink birds are actually born white and get their color from the food they eat.", emoji: "🦩" },
  { text: "Octopuses have three hearts and blue blood. Two hearts pump blood to the gills while the third pumps it to the rest of the body.", emoji: "🐙" },
  { text: "The shortest war in history lasted only 38 minutes between Britain and Zanzibar in 1896. Britain won decisively.", emoji: "⚔️" },
  { text: "Bananas are technically berries in botanical terms, but strawberries are not. This is because of how their fruits develop from flowers.", emoji: "🍌" },
  { text: "A day on Venus is longer than a year on Venus. It takes Venus longer to rotate on its axis than to orbit the Sun.", emoji: "🌌" },
  { text: "There are more stars in the universe than grains of sand on all of Earth's beaches combined. The universe contains an estimated 2 trillion galaxies.", emoji: "✨" },
  { text: "Crows are remarkably intelligent birds that can recognize human faces and remember people who wronged them for many years.", emoji: "🐦" },
  { text: "The inventor of the Pringles can, Fredric Baur, was so proud of his invention that he requested his ashes be buried in one.", emoji: "🥔" },
  { text: "A bolt of lightning is approximately five times hotter than the surface of the Sun, reaching temperatures of about 30,000 Kelvin.", emoji: "⚡" },
  { text: "A snail can sleep for up to 3 years during unfavorable conditions such as drought to conserve energy and moisture.", emoji: "🐌" },
  { text: "Butterflies taste with their feet. They have taste sensors on their legs that help them identify plants for laying eggs.", emoji: "🦋" },
  { text: "Apples are more effective at waking you up in the morning than coffee due to their natural sugars, fiber, and vitamins.", emoji: "🍎" },
  { text: "The human heart beats about 100,000 times per day, pumping approximately 2,000 gallons of blood through your body every single day.", emoji: "❤️" },
  { text: "Cleopatra lived closer in time to the Moon landing than to the construction of the Great Pyramid of Giza.", emoji: "🏛️" },
  { text: "The human nose can detect over 1 trillion different smells, making it one of the most sophisticated sensory organs in nature.", emoji: "👃" },
  { text: "Hot water can freeze faster than cold water under certain conditions. This phenomenon is known as the Mpemba effect.", emoji: "❄️" },
  { text: "The average person laughs about 13 times per day. Laughter is proven to reduce stress and boost the immune system significantly.", emoji: "😂" },
  { text: "A group of owls is called a parliament. Owls have been associated with wisdom and knowledge throughout all of human history.", emoji: "🦉" },
  { text: "Elephants are the only mammals that cannot jump. Despite being the largest land animals, their bone structure prevents jumping.", emoji: "🐘" },
  { text: "The Great Wall of China is not visible from space with the naked eye, contrary to the popular myth that has persisted for decades.", emoji: "🏯" },
  { text: "A group of cats is called a clowder. There are over 600 million domestic cats in the world today.", emoji: "🐱" },
  { text: "The Eiffel Tower grows about 6 inches taller in summer due to thermal expansion when the iron heats up in warm weather.", emoji: "🗼" },
  { text: "Sharks are older than trees. Sharks have been around for about 450 million years while trees only appeared about 350 million years ago.", emoji: "🦈" },
  { text: "A day on Mars is 24 hours and 37 minutes, which is remarkably similar to a day on Earth.", emoji: "🔴" },
  { text: "The world's oldest known living tree is a bristlecone pine named Methuselah, which is over 4,800 years old.", emoji: "🌲" },
  { text: "Wombat droppings are cube-shaped. They are the only animal in the world known to produce cube-shaped feces.", emoji: "🐨" },
  { text: "The unicorn is the national animal of Scotland. It has been a part of Scottish heraldry since the 12th century.", emoji: "🦄" },
  { text: "A group of porcupines is called a prickle. Baby porcupines are called porcupettes and are born with soft quills.", emoji: "🦔" },
  { text: "The tongue is the only muscle in the human body that is attached at only one end.", emoji: "👅" },
  { text: "Humans share about 50% of their DNA with bananas. This shows how closely all life on Earth is related.", emoji: "🧬" },
  { text: "The average cloud weighs about 1.1 million pounds. Despite this enormous weight, clouds float because the water droplets are spread over a huge area.", emoji: "☁️" },
  { text: "A group of jellyfish is called a smack. Jellyfish have been around for over 500 million years, making them one of the oldest animals on Earth.", emoji: "🪼" },
  { text: "The human brain generates about 23 watts of electrical power while awake, enough to power a small light bulb.", emoji: "🧠" },
  { text: "An ostrich's eye is bigger than its brain. Ostriches have the largest eyes of any land animal on Earth.", emoji: "🦅" },
  { text: "The fingerprints of a koala are virtually indistinguishable from those of humans, even under a microscope.", emoji: "🐨" },
  { text: "A group of butterflies is called a kaleidoscope. There are about 20,000 known species of butterflies in the world.", emoji: "🦋" },
  { text: "The wood frog can freeze solid during winter and thaw out in spring, surviving without a heartbeat for months.", emoji: "🐸" },
  { text: "Honey bees can recognize human faces. They use the same technique as humans, known as configural processing.", emoji: "🐝" },
  { text: "The average person walks about 100,000 miles in their lifetime, which is equivalent to walking around the Earth four times.", emoji: "👣" },
  { text: "A group of ravens is called an unkindness or a conspiracy. Ravens are among the most intelligent birds in the world.", emoji: "🪶" },
  { text: "The dot over the lowercase letter i is called a tittle. It is one of the smallest named parts of any letter in the English alphabet.", emoji: "📝" },
  { text: "Penguins propose to their mates with pebbles. Male penguins search for the perfect pebble to present to a female they want to court.", emoji: "🐧" },
  { text: "The shortest place name in the world is Å, which is a village in Norway. The letter Å means river in Norwegian.", emoji: "🗺️" },
  { text: "A group of flamingos can include thousands of birds. Flamingos are social animals that thrive in large flocks.", emoji: "🦩" },
  { text: "Sea otters hold hands while sleeping to prevent drifting apart. This behavior is called rafting and keeps families together.", emoji: "🦦" },
  { text: "The Hawaiian alphabet only has 13 letters, making it one of the smallest alphabets in the world.", emoji: "🌺" },
  { text: "Cows have best friends and get stressed when separated from them. Research shows cows are deeply social animals.", emoji: "🐄" },
  { text: "The average person spends about six months of their lifetime waiting for red traffic lights to turn green.", emoji: "🚦" },
  { text: "A group of pandas is called an embarrassment. Giant pandas spend about 12 hours a day eating bamboo.", emoji: "🐼" },
  { text: "The heart of a blue whale is so large that a human could crawl through its arteries. It weighs about 400 pounds.", emoji: "🐋" },
  { text: "Sloths are so slow that algae grows on their fur, which actually helps camouflage them in the forest canopy.", emoji: "🦥" },
  { text: "The shortest complete sentence in the English language is Go. It contains a subject (implied you) and a verb.", emoji: "📖" },
  { text: "A group of hippos is called a bloat. Despite their size, hippos can run at speeds of up to 20 miles per hour on land.", emoji: "🦛" },
  { text: "The average person breathes in about 11,000 liters of air every day without even thinking about it.", emoji: "💨" },
  { text: "Turkeys can blush. When they are excited or scared, the fleshy parts on their head and neck change color from red to blue to white.", emoji: "🦃" },
  { text: "The tongue print of a human is as unique as a fingerprint. No two people have exactly the same tongue print.", emoji: "👅" },
  { text: "A group of giraffes is called a tower. Giraffes sleep for only about 4.6 hours per day, usually in short naps.", emoji: "🦒" },
  { text: "The electric eel is not actually an eel. It is more closely related to catfish and carp than to true eels.", emoji: "⚡" },
  { text: "The average person uses about 100 gallons of water per day. This includes water for drinking, cooking, bathing, and other uses.", emoji: "💧" },
  { text: "A group of sharks is called a shiver. Great white sharks can detect blood in water from up to 3 miles away.", emoji: "🦈" },
  { text: "The world record for the longest hiccuping spree is 68 years. Charles Osborne hiccupped continuously from 1922 to 1990.", emoji: "😮" },
  { text: "A group of zebras is called a dazzle. Each zebra has a unique stripe pattern, just like human fingerprints.", emoji: "🦓" },
  { text: "The total weight of all ants on Earth is greater than the total weight of all humans on Earth combined.", emoji: "🐜" },
  { text: "A group of gorillas is called a troop. Gorillas share about 98.3% of their DNA with humans.", emoji: "🦍" },
  { text: "The moon is moving away from Earth at a rate of about 1.5 inches per year due to tidal forces.", emoji: "🌙" },
  { text: "A group of meerkats is called a mob. Meerkats are immune to the venom of scorpions and some other venomous animals.", emoji: "🦡" },
  { text: "The human eye can distinguish about 10 million different colors. Women tend to see more shades of color than men.", emoji: "👁️" },
  { text: "A group of kangaroos is called a mob or a troop. Kangaroos cannot walk backwards due to their large tails.", emoji: "🦘" },
  { text: "The smell of fresh rain on dry earth has a name. It is called petrichor, and it is caused by a compound called geosmin.", emoji: "🌧️" },
  { text: "A group of dolphins is called a pod. Dolphins sleep with one eye open to watch for predators while resting.", emoji: "🐬" },
  { text: "The average person produces enough saliva in their lifetime to fill two swimming pools.", emoji: "💧" },
  { text: "A group of elephants is called a herd. Elephants are the only animals that cannot jump, despite their enormous size.", emoji: "🐘" },
  { text: "The Sahara desert is growing at a rate of about 30 miles per year due to desertification and climate change.", emoji: "🏜️" },
  { text: "A group of wolves is called a pack. Wolves mate for life and are highly social animals that live in close family groups.", emoji: "🐺" },
  { text: "The human skeleton is completely replaced approximately every 10 years as old bone cells are replaced by new ones.", emoji: "🦴" },
  { text: "A group of monkeys is called a troop. Monkeys use different calls to warn their group about different types of predators.", emoji: "🐒" },
  { text: "The speed of light is approximately 186,000 miles per second. It takes light about 8 minutes to travel from the Sun to Earth.", emoji: "💫" },
  { text: "A group of lions is called a pride. Female lions do about 90% of the hunting for the pride.", emoji: "🦁" },
  { text: "The human body contains about 37 trillion cells. Each cell contains a complete copy of your DNA.", emoji: "🔬" },
  { text: "A group of penguins on land is called a waddle. Emperor penguins can hold their breath for up to 22 minutes underwater.", emoji: "🐧" },
  { text: "The first computer bug was an actual bug. In 1947, a moth was found trapped in a relay in the Harvard Mark II computer.", emoji: "🐛" },
  { text: "A group of crocodiles in water is called a float. Crocodiles cannot stick out their tongues because they are attached to the roof of their mouth.", emoji: "🐊" },
  { text: "The Amazon River discharges about 20% of all fresh water that flows into the world's oceans.", emoji: "🌊" },
  { text: "A group of tigers is called a streak or an ambush. Tigers are the largest wild cats in the world.", emoji: "🐯" },
  { text: "The loudest animal on Earth is the sperm whale. Their clicks can reach 230 decibels, louder than a jet engine.", emoji: "🐋" },
  { text: "A group of bats is called a colony. Bats are the only mammals capable of sustained natural flight.", emoji: "🦇" },
  { text: "The Dead Sea is so salty that nothing can sink in it. The high salt concentration makes the water much denser than the human body.", emoji: "🌊" },
  { text: "A group of parrots is called a pandemonium. Some parrots can live for over 80 years, outliving their owners.", emoji: "🦜" },
  { text: "The human liver can regenerate itself. Even if up to 75% of the liver is removed, it can grow back to its original size.", emoji: "🫀" },
  { text: "A group of hyenas is called a cackle. Female hyenas are larger and more dominant than males in their social structure.", emoji: "🐆" },
  { text: "The deepest point in the ocean is the Mariana Trench, which reaches a depth of about 36,000 feet below sea level.", emoji: "🌊" },
  { text: "A group of foxes is called a skulk or an earth. Foxes are incredibly adaptable and can live in almost any environment.", emoji: "🦊" },
  { text: "The human body has enough iron in it to make a nail about 3 inches long.", emoji: "🔩" },
  { text: "A group of eagles is called a convocation. Eagles have exceptional vision and can spot prey from over a mile away.", emoji: "🦅" },
  { text: "The first oranges were not orange. Original oranges from Southeast Asia were actually green and stayed green even when ripe.", emoji: "🍊" },
  { text: "A group of whales is called a pod or a gam. Blue whales are the largest animals ever known to have existed on Earth.", emoji: "🐋" },
  { text: "The longest recorded flight of a chicken is 13 seconds. Chickens are not built for sustained flight despite having wings.", emoji: "🐔" },
];

const TIPS = [
  {
    title: "Start Your Morning with Intention",
    content: "The way you start your morning sets the tone for the entire day. Reading a motivational quote first thing in the morning can shift your mindset from passive to active. Research shows that people who begin their day with positive affirmations and motivational content are more productive, focused, and resilient throughout the day. Instead of reaching for social media or news, try reading an inspiring quote and reflecting on how it applies to your current goals and challenges. Daily Spark is designed to be your first stop every morning.",
    emoji: "🌅"
  },
  {
    title: "The Science Behind Motivation",
    content: "Motivation is not just a feeling — it is a neurological process. When you read or hear something inspiring, your brain releases dopamine, a neurotransmitter associated with pleasure and reward. This chemical reaction actually helps reinforce positive behaviors and thinking patterns. By consistently exposing yourself to motivational content, you are literally rewiring your brain to think more positively and take action. Daily Spark is designed to give you this neurological boost every single day, helping you build a stronger, more resilient mindset over time.",
    emoji: "🧠"
  },
  {
    title: "How Fun Facts Make You Smarter",
    content: "Learning something new every day is one of the most effective ways to keep your brain sharp and healthy. Fun facts are not just entertaining — they stimulate curiosity, improve memory, and make you a more interesting conversationalist. When you learn a surprising fact, your brain forms new neural connections that strengthen your overall cognitive ability. Studies show that people who continuously learn new things are less likely to develop cognitive decline as they age. Daily Spark delivers fascinating facts that will expand your knowledge one day at a time, keeping your mind active and curious.",
    emoji: "💡"
  },
  {
    title: "Building a Daily Motivation Habit",
    content: "Consistency is the key to lasting change. Reading one motivational quote per day might seem small, but the cumulative effect over weeks and months is truly transformative. Think of it like exercise — one workout doesn't change your body, but consistent daily exercise over time produces dramatic results. The same is true for your mindset. By making Daily Spark part of your daily routine, you are investing in your mental fitness. Set a specific time each day to visit the app, whether it is morning, lunch, or before bed, and stick to it religiously.",
    emoji: "📅"
  },
  {
    title: "Sharing Inspiration with Others",
    content: "One of the most powerful things you can do with a good quote or interesting fact is share it with someone else. When you share inspiration, you not only brighten someone else's day but also reinforce the message in your own mind. Research on learning shows that teaching or sharing information helps you retain it up to 90% better than simply reading it. Use the Daily Spark app to find quotes and facts that resonate with you, then share them with friends, family, or colleagues. You never know whose day you might change with a single inspiring message.",
    emoji: "🤝"
  },
  {
    title: "Overcoming Self-Doubt with Positive Thinking",
    content: "Self-doubt is one of the biggest barriers to personal success and happiness. It is that inner voice that says you are not good enough, smart enough, or capable enough. The good news is that positive thinking is a skill that can be developed with practice. By regularly exposing yourself to inspiring words from people who have overcome great challenges, you begin to internalize the belief that you too can succeed. Daily Spark provides you with wisdom from history's greatest minds to help you silence self-doubt and build unshakeable self-confidence.",
    emoji: "💪"
  },
  {
    title: "The Power of Learning Something New Every Day",
    content: "The world's most successful people share one common habit: they never stop learning. Whether it is reading books, taking courses, or simply learning one new fact every day, continuous learning is the foundation of personal growth. When you learn something new, your brain creates new neural pathways that make you more creative, adaptable, and intelligent. Daily Spark makes daily learning effortless by delivering fascinating fun facts directly to you. Over the course of a year, you will have learned 365 new things without any significant effort.",
    emoji: "📚"
  },
];

const ads = [
  { label: "SPONSORED", text: "Boost your productivity with FocusFlow Pro", accent: "#e94560" },
  { label: "AD", text: "Try MindfulMe — 7 days free meditation", accent: "#00d4aa" },
  { label: "SPONSORED", text: "Learn anything in 10 mins/day with Shortform", accent: "#f5a623" },
  { label: "AD", text: "Unlock your potential with CoachAI — Free trial", accent: "#a78bfa" },
];

const bg = "radial-gradient(ellipse at top left, #1a0a2e 0%, #0a0a0f 55%, #0d1b2a 100%)";
const gold = "#f5c842";
const darkCard = "rgba(255,255,255,0.04)";
const border = "1px solid rgba(255,255,255,0.08)";

export default function App() {
  const [page, setPage] = useState("home");
  const [tab, setTab] = useState("Quote");
  const [qIdx, setQIdx] = useState(0);
  const [fIdx, setFIdx] = useState(0);
  const [adIdx, setAdIdx] = useState(0);
  const [saved, setSaved] = useState([]);
  const [liked, setLiked] = useState(false);
  const [flipping, setFlipping] = useState(false);
  const [filter, setFilter] = useState("All");
  const [menuOpen, setMenuOpen] = useState(false);

  const categories = ["All", "Motivation", "Wisdom", "Love", "Success"];
  const filteredQuotes = filter === "All" ? QUOTES : QUOTES.filter(q => q.category === filter);
  const current = tab === "Quote" ? filteredQuotes[qIdx % filteredQuotes.length] : FACTS[fIdx % FACTS.length];
  const ad = ads[adIdx % ads.length];

  const next = useCallback(() => {
    setFlipping(true);
    setTimeout(() => {
      if (tab === "Quote") setQIdx(i => (i + 1) % filteredQuotes.length);
      else setFIdx(i => (i + 1) % FACTS.length);
      setLiked(false);
      setAdIdx(a => (a + 1) % ads.length);
    }, 300);
    setTimeout(() => setFlipping(false), 600);
  }, [tab, filteredQuotes.length]);

  const handleSave = () => {
    if (!current) return;
    const item = { ...current, type: tab };
    if (!saved.some(s => s.text === item.text)) setSaved(prev => [item, ...prev]);
    setLiked(true);
  };

  const pageStyle = {
    minHeight: "100vh", background: bg,
    fontFamily: "Georgia, serif", color: "#f0ede6",
    display: "flex", flexDirection: "column", alignItems: "center",
    padding: "0 16px 60px",
  };

  const navLinks = [
    { label: "Home", key: "home" },
    { label: "Quotes", key: "quotes" },
    { label: "Facts", key: "facts" },
    { label: "Tips", key: "tips" },
    { label: "Saved", key: "saved" },
    { label: "About", key: "about" },
  ];

  const Nav = () => (
    <div style={{ width: "100%", maxWidth: 700, display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 0 16px", borderBottom: "1px solid rgba(255,255,255,0.06)", marginBottom: 24, position: "relative" }}>
      <div onClick={() => setPage("home")} style={{ cursor: "pointer" }}>
        <div style={{ fontSize: 20, fontWeight: 800, color: gold, letterSpacing: "0.05em" }}>✦ Daily Spark</div>
        <div style={{ fontSize: 10, color: "#555", letterSpacing: "0.15em", textTransform: "uppercase" }}>Ignite Your Day</div>
      </div>
      <button onClick={() => setMenuOpen(!menuOpen)} style={{ background: "none", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, color: "#aaa", fontSize: 18, cursor: "pointer", padding: "4px 12px" }}>☰</button>
      {menuOpen && (
        <div style={{ position: "fixed", top: 70, right: 16, zIndex: 1000, background: "#1a1a2e", border, borderRadius: 16, padding: "12px 0", minWidth: 160, boxShadow: "0 20px 60px rgba(0,0,0,0.8)" }}>
          {navLinks.map(n => (
            <button key={n.key} onClick={() => { setPage(n.key); setMenuOpen(false); }} style={{ display: "block", width: "100%", padding: "12px 20px", background: "none", border: "none", color: page === n.key ? gold : "#ccc", fontSize: 14, cursor: "pointer", fontFamily: "inherit", textAlign: "left", fontWeight: page === n.key ? 700 : 400 }}>{n.label}</button>
          ))}
        </div>
      )}
    </div>
  );

  const AdBanner = () => (
    <div style={{ width: "100%", maxWidth: 700, marginTop: 28, background: "rgba(255,255,255,0.03)", border: `1px solid ${ad.accent}30`, borderRadius: 16, padding: "14px 18px", display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer" }}>
      <div>
        <div style={{ fontSize: 9, color: ad.accent, marginBottom: 4, letterSpacing: "0.2em" }}>{ad.label}</div>
        <div style={{ fontSize: 13, color: "#ccc" }}>{ad.text}</div>
      </div>
      <div style={{ background: ad.accent, color: "#fff", fontSize: 10, padding: "7px 14px", borderRadius: 8, whiteSpace: "nowrap", marginLeft: 16, fontWeight: 700 }}>Learn More</div>
    </div>
  );

  const Footer = () => (
    <div style={{ width: "100%", maxWidth: 700, marginTop: 40, borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 20 }}>
        <div>
          <div style={{ fontSize: 18, fontWeight: 800, color: gold, marginBottom: 8 }}>✦ Daily Spark</div>
          <p style={{ fontSize: 12, color: "#555", lineHeight: 1.6, maxWidth: 240 }}>Your daily source of motivation, wisdom, and fascinating facts. Ignite your day, every day.</p>
        </div>
        <div style={{ display: "flex", gap: 32 }}>
          <div>
            <div style={{ fontSize: 11, color: gold, letterSpacing: "0.1em", marginBottom: 10, textTransform: "uppercase" }}>Navigate</div>
            {navLinks.map(n => (
              <button key={n.key} onClick={() => setPage(n.key)} style={{ display: "block", background: "none", border: "none", color: "#666", fontSize: 12, cursor: "pointer", fontFamily: "inherit", marginBottom: 6, padding: 0, textAlign: "left" }}>{n.label}</button>
            ))}
          </div>
          <div>
            <div style={{ fontSize: 11, color: gold, letterSpacing: "0.1em", marginBottom: 10, textTransform: "uppercase" }}>Legal</div>
            <button onClick={() => setPage("privacy")} style={{ display: "block", background: "none", border: "none", color: "#666", fontSize: 12, cursor: "pointer", fontFamily: "inherit", marginBottom: 6, padding: 0 }}>Privacy Policy</button>
            <button onClick={() => setPage("about")} style={{ display: "block", background: "none", border: "none", color: "#666", fontSize: 12, cursor: "pointer", fontFamily: "inherit", marginBottom: 6, padding: 0 }}>About Us</button>
            <a href="mailto:ignitedailyspark@gmail.com" style={{ display: "block", color: "#666", fontSize: 12, textDecoration: "none" }}>Contact</a>
          </div>
        </div>
      </div>
      <div style={{ marginTop: 24, paddingTop: 16, borderTop: "1px solid rgba(255,255,255,0.04)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
        <div style={{ fontSize: 11, color: "#333" }}>© 2025 Daily Spark. All rights reserved.</div>
        <div style={{ fontSize: 11, color: "#333" }}>Contact: ignitedailyspark@gmail.com</div>
      </div>
    </div>
  );

  const QuoteCard = ({ q }) => (
    <div style={{ animation: flipping ? "flipOut 0.3s ease forwards" : "flipIn 0.3s ease forwards" }}>
      <div style={{ background: "linear-gradient(145deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 28, padding: "44px 32px 36px", minHeight: 220, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -60, right: -60, width: 200, height: 200, background: "radial-gradient(circle, rgba(245,200,66,0.1) 0%, transparent 70%)", borderRadius: "50%" }} />
        <div style={{ fontSize: 60, color: "rgba(245,200,66,0.2)", lineHeight: 1, marginBottom: 8 }}>"</div>
        <p style={{ fontSize: 20, lineHeight: 1.75, color: "#f0ede6", margin: "0 0 24px", fontStyle: "italic" }}>{q?.text}</p>
        <div style={{ fontSize: 13, color: gold }}>— {q?.author}</div>
        <div style={{ marginTop: 6, fontSize: 11, color: "#555", letterSpacing: "0.1em" }}>{q?.category?.toUpperCase()}</div>
      </div>
      <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
        <button onClick={handleSave} style={{ flex: 1, padding: "14px", borderRadius: 16, border, background: liked ? "rgba(245,200,66,0.1)" : darkCard, color: liked ? gold : "#666", fontSize: 20, cursor: "pointer" }}>{liked ? "★" : "☆"}</button>
        <button onClick={next} style={{ flex: 3, padding: "14px", borderRadius: 16, border: "none", background: `linear-gradient(135deg, ${gold}, #f5a623)`, color: "#0a0a0f", fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", boxShadow: "0 8px 24px rgba(245,200,66,0.35)" }}>Next Quote →</button>
      </div>
    </div>
  );

  if (page === "home") return (
    <div style={pageStyle}>
      <style>{`@keyframes flipOut{0%{transform:perspective(600px) rotateY(0);opacity:1}100%{transform:perspective(600px) rotateY(90deg);opacity:0}} @keyframes flipIn{0%{transform:perspective(600px) rotateY(-90deg);opacity:0}100%{transform:perspective(600px) rotateY(0);opacity:1}} @keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}`}</style>
      <Nav />
      <div style={{ width: "100%", maxWidth: 700, textAlign: "center", padding: "40px 0 48px", animation: "fadeUp 0.8s ease" }}>
        <div style={{ fontSize: 56, marginBottom: 16, filter: "drop-shadow(0 0 30px rgba(245,200,66,0.5))" }}>✦</div>
        <h1 style={{ fontSize: 36, fontWeight: 800, color: gold, marginBottom: 16, lineHeight: 1.2 }}>Daily Spark</h1>
        <p style={{ fontSize: 18, color: "#aaa", lineHeight: 1.7, maxWidth: 500, margin: "0 auto 12px" }}>Your daily source of motivational quotes and fascinating fun facts.</p>
        <p style={{ fontSize: 14, color: "#666", lineHeight: 1.7, maxWidth: 560, margin: "0 auto 32px" }}>Start every day with inspiration, wisdom, and the spark you need to achieve your goals. Browse over 100 motivational quotes and 100 fascinating fun facts completely free.</p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <button onClick={() => setPage("quotes")} style={{ padding: "14px 28px", background: `linear-gradient(135deg, ${gold}, #f5a623)`, border: "none", borderRadius: 14, color: "#0a0a0f", fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", boxShadow: "0 8px 24px rgba(245,200,66,0.35)" }}>Read Quotes →</button>
          <button onClick={() => setPage("facts")} style={{ padding: "14px 28px", background: darkCard, border, borderRadius: 14, color: "#ccc", fontSize: 15, cursor: "pointer", fontFamily: "inherit" }}>Fun Facts →</button>
        </div>
      </div>

      <div style={{ width: "100%", maxWidth: 700, marginBottom: 48 }}>
        <h2 style={{ fontSize: 24, color: gold, marginBottom: 8, textAlign: "center" }}>What Daily Spark Offers</h2>
        <p style={{ color: "#888", textAlign: "center", fontSize: 14, marginBottom: 32, lineHeight: 1.7 }}>Daily Spark is a completely free platform designed to bring you daily inspiration, knowledge, and motivation. We believe that a small dose of wisdom every day can transform your life over time. Here is everything you get for free on Daily Spark.</p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          {[
            { emoji: "💬", title: "100 Motivational Quotes", desc: "Over 100 hand-picked quotes from the world's greatest thinkers, leaders, and visionaries across four categories: Motivation, Wisdom, Love, and Success." },
            { emoji: "🔬", title: "100 Fun Facts", desc: "100 fascinating facts about science, history, nature, animals, and the incredible world around us. Learn something new and surprising every single day." },
            { emoji: "🎯", title: "Category Filter", desc: "Filter quotes by category to find exactly the type of inspiration you need. Whether you need motivation, wisdom, love, or success quotes, we have you covered." },
            { emoji: "💾", title: "Save Favorites", desc: "Save the quotes and facts that resonate most with you and build your personal collection of inspiration to revisit whenever you need a boost." },
            { emoji: "📖", title: "Motivation Tips", desc: "Read our in-depth articles on motivation, personal development, and the science of positive thinking to help you apply inspiration to your real life." },
            { emoji: "🆓", title: "Completely Free", desc: "Daily Spark is 100% free to use. No subscriptions, no hidden fees, no registration required. Just pure inspiration available to everyone." },
          ].map((item, i) => (
            <div key={i} style={{ background: darkCard, border, borderRadius: 20, padding: "24px 20px" }}>
              <div style={{ fontSize: 32, marginBottom: 12 }}>{item.emoji}</div>
              <h3 style={{ fontSize: 15, color: gold, marginBottom: 8 }}>{item.title}</h3>
              <p style={{ fontSize: 13, color: "#888", lineHeight: 1.6 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ width: "100%", maxWidth: 700, marginBottom: 48 }}>
        <h2 style={{ fontSize: 22, color: gold, marginBottom: 24, textAlign: "center" }}>Quote of the Day</h2>
        <QuoteCard q={QUOTES[qIdx % QUOTES.length]} />
      </div>

      <div style={{ width: "100%", maxWidth: 700, marginBottom: 48 }}>
        <h2 style={{ fontSize: 22, color: gold, marginBottom: 8, textAlign: "center" }}>Did You Know?</h2>
        <p style={{ color: "#888", textAlign: "center", fontSize: 14, marginBottom: 24 }}>Discover fascinating facts that will surprise and amaze you every day.</p>
        <div style={{ display: "grid", gap: 12 }}>
          {FACTS.slice(0, 4).map((fact, i) => (
            <div key={i} style={{ background: darkCard, border, borderRadius: 18, padding: "20px 24px", display: "flex", gap: 16, alignItems: "flex-start" }}>
              <div style={{ fontSize: 36 }}>{fact.emoji}</div>
              <p style={{ fontSize: 14, color: "#ccc", lineHeight: 1.7, margin: 0 }}>{fact.text}</p>
            </div>
          ))}
        </div>
        <button onClick={() => setPage("facts")} style={{ width: "100%", marginTop: 16, padding: "14px", background: darkCard, border, borderRadius: 14, color: "#aaa", fontSize: 14, cursor: "pointer", fontFamily: "inherit" }}>See All 100 Fun Facts →</button>
      </div>

      <div style={{ width: "100%", maxWidth: 700, marginBottom: 48 }}>
        <h2 style={{ fontSize: 22, color: gold, marginBottom: 8, textAlign: "center" }}>Why Daily Spark?</h2>
        <p style={{ color: "#888", textAlign: "center", fontSize: 14, marginBottom: 20, lineHeight: 1.7 }}>In a world full of negativity and distractions, Daily Spark exists to give you a moment of clarity, inspiration, and knowledge every single day. Whether you are facing challenges at work, in relationships, or in your personal growth journey, the right words at the right time can make all the difference.</p>
        <p style={{ color: "#888", textAlign: "center", fontSize: 14, lineHeight: 1.7 }}>Daily Spark curates the most powerful and meaningful quotes from history's greatest minds and combines them with fascinating facts that will expand your worldview. Our goal is simple: to help you start every day with intention, wisdom, and curiosity.</p>
      </div>

      <AdBanner />
      <Footer />
    </div>
  );

  if (page === "quotes") return (
    <div style={pageStyle}>
      <style>{`@keyframes flipOut{0%{transform:perspective(600px) rotateY(0);opacity:1}100%{transform:perspective(600px) rotateY(90deg);opacity:0}} @keyframes flipIn{0%{transform:perspective(600px) rotateY(-90deg);opacity:0}100%{transform:perspective(600px) rotateY(0);opacity:1}}`}</style>
      <Nav />
      <div style={{ width: "100%", maxWidth: 700 }}>
        <h1 style={{ fontSize: 28, color: gold, marginBottom: 8 }}>Motivational Quotes</h1>
        <p style={{ color: "#888", fontSize: 14, lineHeight: 1.7, marginBottom: 32 }}>Explore our collection of over 100 powerful motivational quotes from history's greatest thinkers, leaders, and visionaries. Filter by category to find the inspiration you need right now. Each quote has been carefully selected to provide genuine wisdom and motivation for your daily life. Whether you need motivation to start your day, wisdom to solve a problem, love to strengthen your relationships, or inspiration to achieve success, you will find it here.</p>
        <div style={{ display: "flex", gap: 8, marginBottom: 28, overflowX: "auto", paddingBottom: 4 }}>
          {categories.map(cat => (
            <button key={cat} onClick={() => { setFilter(cat); setQIdx(0); }} style={{ padding: "8px 16px", borderRadius: 20, border: "none", whiteSpace: "nowrap", background: filter === cat ? gold : "rgba(255,255,255,0.06)", color: filter === cat ? "#0a0a0f" : "#888", fontWeight: filter === cat ? 700 : 400, fontSize: 13, cursor: "pointer", fontFamily: "inherit" }}>{cat}</button>
          ))}
        </div>
        <QuoteCard q={current} />
        <h2 style={{ fontSize: 20, color: gold, marginTop: 48, marginBottom: 8 }}>All {filter === "All" ? "" : filter} Quotes ({filteredQuotes.length})</h2>
        <p style={{ color: "#888", fontSize: 13, marginBottom: 20, lineHeight: 1.6 }}>Browse through our complete collection of {filteredQuotes.length} {filter === "All" ? "" : filter.toLowerCase()} quotes below. Each quote is a timeless piece of wisdom from some of history's most inspiring figures.</p>
        <div style={{ display: "grid", gap: 12 }}>
          {filteredQuotes.map((q, i) => (
            <div key={i} style={{ background: darkCard, border, borderRadius: 18, padding: "20px 24px" }}>
              <p style={{ fontSize: 14, color: "#ccc", lineHeight: 1.7, margin: "0 0 10px", fontStyle: "italic" }}>"{q.text}"</p>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 12, color: gold }}>— {q.author}</span>
                <span style={{ fontSize: 10, color: "#444", letterSpacing: "0.1em" }}>{q.category.toUpperCase()}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <AdBanner />
      <Footer />
    </div>
  );

  if (page === "facts") return (
    <div style={pageStyle}>
      <style>{`@keyframes flipOut{0%{transform:perspective(600px) rotateY(0);opacity:1}100%{transform:perspective(600px) rotateY(90deg);opacity:0}} @keyframes flipIn{0%{transform:perspective(600px) rotateY(-90deg);opacity:0}100%{transform:perspective(600px) rotateY(0);opacity:1}}`}</style>
      <Nav />
      <div style={{ width: "100%", maxWidth: 700 }}>
        <h1 style={{ fontSize: 28, color: gold, marginBottom: 8 }}>Fun Facts</h1>
        <p style={{ color: "#888", fontSize: 14, lineHeight: 1.7, marginBottom: 32 }}>Expand your knowledge with our collection of 100 fascinating fun facts about science, history, nature, animals, and the incredible world we live in. Learning something new every day keeps your mind sharp, makes you more interesting in conversations, and helps you see the world in a new way. Browse through all our amazing facts below and discover something that will surprise you today.</p>
        <div style={{ animation: flipping ? "flipOut 0.3s ease forwards" : "flipIn 0.3s ease forwards", marginBottom: 16 }}>
          <div style={{ background: "linear-gradient(145deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 28, padding: "44px 32px 36px", minHeight: 200 }}>
            <div style={{ fontSize: 56, marginBottom: 20 }}>{FACTS[fIdx % FACTS.length].emoji}</div>
            <p style={{ fontSize: 19, lineHeight: 1.75, color: "#f0ede6", margin: 0 }}>{FACTS[fIdx % FACTS.length].text}</p>
          </div>
          <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
            <button onClick={handleSave} style={{ flex: 1, padding: "14px", borderRadius: 16, border, background: liked ? "rgba(245,200,66,0.1)" : darkCard, color: liked ? gold : "#666", fontSize: 20, cursor: "pointer" }}>{liked ? "★" : "☆"}</button>
            <button onClick={() => { setFlipping(true); setTimeout(() => { setFIdx(i => (i + 1) % FACTS.length); setLiked(false); }, 300); setTimeout(() => setFlipping(false), 600); }} style={{ flex: 3, padding: "14px", borderRadius: 16, border: "none", background: `linear-gradient(135deg, ${gold}, #f5a623)`, color: "#0a0a0f", fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", boxShadow: "0 8px 24px rgba(245,200,66,0.35)" }}>Next Fact →</button>
          </div>
        </div>
        <h2 style={{ fontSize: 20, color: gold, marginTop: 48, marginBottom: 8 }}>All Fun Facts ({FACTS.length})</h2>
        <p style={{ color: "#888", fontSize: 13, marginBottom: 20, lineHeight: 1.6 }}>Here are all {FACTS.length} of our fascinating fun facts. Each one is carefully chosen to amaze, educate, and entertain you. Share them with friends and family to spread knowledge and spark interesting conversations.</p>
        <div style={{ display: "grid", gap: 12 }}>
          {FACTS.map((fact, i) => (
            <div key={i} style={{ background: darkCard, border, borderRadius: 18, padding: "20px 24px", display: "flex", gap: 16, alignItems: "flex-start" }}>
              <div style={{ fontSize: 36, flexShrink: 0 }}>{fact.emoji}</div>
              <p style={{ fontSize: 14, color: "#ccc", lineHeight: 1.7, margin: 0 }}>{fact.text}</p>
            </div>
          ))}
        </div>
      </div>
      <AdBanner />
      <Footer />
    </div>
  );

  if (page === "tips") return (
    <div style={pageStyle}>
      <Nav />
      <div style={{ width: "100%", maxWidth: 700 }}>
        <h1 style={{ fontSize: 28, color: gold, marginBottom: 8 }}>Motivation Tips and Articles</h1>
        <p style={{ color: "#888", fontSize: 14, lineHeight: 1.7, marginBottom: 32 }}>Read our in-depth articles on motivation, personal development, and the science of positive thinking. These tips will help you get the most out of Daily Spark and apply inspiration to your real life for lasting change and growth.</p>
        <div style={{ display: "grid", gap: 20 }}>
          {TIPS.map((tip, i) => (
            <div key={i} style={{ background: darkCard, border, borderRadius: 20, padding: "28px 24px" }}>
              <div style={{ fontSize: 36, marginBottom: 12 }}>{tip.emoji}</div>
              <h2 style={{ fontSize: 18, color: gold, marginBottom: 12 }}>{tip.title}</h2>
              <p style={{ fontSize: 14, color: "#aaa", lineHeight: 1.8 }}>{tip.content}</p>
            </div>
          ))}
        </div>
      </div>
      <AdBanner />
      <Footer />
    </div>
  );

  if (page === "saved") return (
    <div style={pageStyle}>
      <Nav />
      <div style={{ width: "100%", maxWidth: 700 }}>
        <h1 style={{ fontSize: 28, color: gold, marginBottom: 8 }}>Your Saved Collection</h1>
        <p style={{ color: "#888", fontSize: 14, lineHeight: 1.7, marginBottom: 28 }}>Here are all the quotes and facts you have saved. Your personal collection of inspiration is stored here for you to revisit whenever you need a boost of motivation or a fascinating fact to share with others.</p>
        {!saved.length ? (
          <div style={{ background: darkCard, border, borderRadius: 20, padding: "48px", textAlign: "center" }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>☆</div>
            <h3 style={{ color: gold, marginBottom: 8 }}>Nothing saved yet</h3>
            <p style={{ color: "#555", fontSize: 14 }}>Go to Quotes or Facts and tap the star button to save items to your collection.</p>
            <button onClick={() => setPage("quotes")} style={{ marginTop: 20, padding: "12px 24px", background: `linear-gradient(135deg, ${gold}, #f5a623)`, border: "none", borderRadius: 12, color: "#0a0a0f", fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>Browse Quotes</button>
          </div>
        ) : saved.map((item, i) => (
          <div key={i} style={{ background: darkCard, border, borderRadius: 18, padding: "20px 24px", marginBottom: 12 }}>
            <div style={{ fontSize: 10, color: gold, marginBottom: 8, letterSpacing: "0.1em" }}>{item.type === "Quote" ? "💬 QUOTE" : "🔬 FUN FACT"}</div>
            <p style={{ margin: 0, fontSize: 14, lineHeight: 1.7, fontStyle: item.type === "Quote" ? "italic" : "normal", color: "#ccc" }}>{item.text}</p>
            {item.author && <div style={{ marginTop: 10, fontSize: 12, color: gold }}>— {item.author}</div>}
          </div>
        ))}
      </div>
      <AdBanner />
      <Footer />
    </div>
  );

  if (page === "about") return (
    <div style={pageStyle}>
      <Nav />
      <div style={{ width: "100%", maxWidth: 700 }}>
        <h1 style={{ fontSize: 28, color: gold, marginBottom: 8 }}>About Daily Spark</h1>
        <p style={{ color: "#888", fontSize: 14, lineHeight: 1.8, marginBottom: 24 }}>Daily Spark is a free motivational platform designed to inspire, educate, and uplift people every single day. We believe that the right words at the right time have the power to change lives, shift perspectives, and ignite the fire within each of us to pursue our goals and dreams.</p>
        <p style={{ color: "#888", fontSize: 14, lineHeight: 1.8, marginBottom: 24 }}>Our platform was created with a simple but powerful mission: to make daily inspiration accessible to everyone, completely free of charge. In a world full of negativity, stress, and distractions, Daily Spark is your sanctuary of positivity and wisdom.</p>
        {[
          { title: "Our Mission", content: "Our mission is to deliver daily doses of motivation, wisdom, and fascinating knowledge to people around the world. We carefully curate quotes from history's greatest thinkers, leaders, philosophers, and innovators, and pair them with surprising and educational fun facts that will expand your worldview. We believe that consistent daily inspiration is the foundation of a fulfilling and successful life." },
          { title: "Our Content", content: "Every quote and fact on Daily Spark has been carefully selected and verified for accuracy and quality. We organize our quotes into four categories: Motivation, Wisdom, Love, and Success — so you can always find the type of inspiration that speaks to your current situation. Our 100 fun facts cover science, history, nature, animals, and the incredible world around us. We regularly add new content to keep Daily Spark fresh and engaging." },
          { title: "Why We Are Free", content: "Daily Spark is supported by advertising, which allows us to keep the platform completely free for all users. We believe inspiration should never have a price tag. The ads you see on our platform help us cover our operational costs and continue providing this service to you at absolutely no charge. We are committed to keeping Daily Spark free for everyone, forever." },
          { title: "Contact Us", content: "We love hearing from our users. Whether you have a suggestion for a quote or fact to add, a question about the platform, feedback about your experience, or just want to share how Daily Spark has helped you — we want to hear from you. Reach us at ignitedailyspark@gmail.com and we will respond within 48 hours." },
        ].map((s, i) => (
          <div key={i} style={{ background: darkCard, border, borderRadius: 20, padding: "28px 24px", marginBottom: 16 }}>
            <h2 style={{ color: gold, fontSize: 18, marginBottom: 12 }}>{s.title}</h2>
            <p style={{ color: "#aaa", fontSize: 14, lineHeight: 1.8, margin: 0 }}>{s.content}</p>
          </div>
        ))}
        <a href="mailto:ignitedailyspark@gmail.com" style={{ display: "block", marginTop: 8, color: gold, fontSize: 14 }}>📧 ignitedailyspark@gmail.com</a>
      </div>
      <AdBanner />
      <Footer />
    </div>
  );

  if (page === "privacy") return (
    <div style={pageStyle}>
      <Nav />
      <div style={{ width: "100%", maxWidth: 700 }}>
        <h1 style={{ fontSize: 28, color: gold, marginBottom: 8 }}>Privacy Policy</h1>
        <p style={{ color: "#888", fontSize: 12, marginBottom: 24 }}>Last updated: June 2025</p>
        <p style={{ color: "#aaa", fontSize: 14, lineHeight: 1.8, marginBottom: 24 }}>Daily Spark operates the website daily-spark-d6fe.vercel.app. This page informs you of our policies regarding the collection, use, and disclosure of personal information when you use our service. We are committed to protecting your privacy and being fully transparent about how we handle your information.</p>
        {[
          { title: "Information We Collect", content: "Daily Spark does not require users to create an account or provide personal information to access our content. We do not collect names, email addresses, phone numbers, or any other personally identifiable information from our visitors. Any preferences you set such as saved quotes are stored locally on your device using your browser's local storage and are never transmitted to our servers." },
          { title: "Cookies and Tracking", content: "Daily Spark uses Google AdSense to display advertisements. Google AdSense uses cookies to serve ads based on your prior visits to our website or other websites on the internet. A cookie is a small file placed on your device by websites you visit. You may refuse the use of cookies by selecting the appropriate settings on your browser. However, if you do so, you may not be able to use the full functionality of this website." },
          { title: "Google AdSense and Advertising", content: "We use Google AdSense to monetize our platform and keep it free for all users. Google, as a third-party vendor, uses cookies to serve ads on our site. Google's use of the DART cookie enables it to serve ads to our users based on their visit to our site and other sites on the internet. Users may opt out of the use of the DART cookie by visiting the Google ad and content network Privacy Policy at https://policies.google.com/technologies/ads." },
          { title: "Third-Party Services", content: "Our website may contain links to other sites that are not operated by us. If you click on a third-party link, you will be directed to that third party's site. We strongly advise you to review the Privacy Policy of every site you visit. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services." },
          { title: "Children's Privacy", content: "Our service does not address anyone under the age of 13. We do not knowingly collect personally identifiable information from children under 13. If you are a parent or guardian and you are aware that your child has provided us with personal data, please contact us at ignitedailyspark@gmail.com so that we can take the necessary actions to protect your child's privacy." },
          { title: "Changes to This Privacy Policy", content: "We may update our Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page." },
          { title: "Contact Us", content: "If you have any questions about this Privacy Policy, our privacy practices, or how we handle your information, please contact us at ignitedailyspark@gmail.com. We take privacy seriously and will respond to all privacy-related inquiries within 48 hours." },
        ].map((s, i) => (
          <div key={i} style={{ background: darkCard, border, borderRadius: 20, padding: "24px", marginBottom: 16 }}>
            <h2 style={{ color: gold, fontSize: 16, marginBottom: 12 }}>{s.title}</h2>
            <p style={{ color: "#aaa", fontSize: 14, lineHeight: 1.8, margin: 0 }}>{s.content}</p>
          </div>
        ))}
      </div>
      <AdBanner />
      <Footer />
    </div>
  );

  return null;
}
