import {ReviewModel} from "../../interfaces/models/ReviewModel";
import Avatar from  "../../assets/images/user_avatar.png";

export const Reviews: ReviewModel[] = [
  {
    id:"1241241231",
    cardId: "1231151-Afa-231-FAs",
    opinion: "In the end, a graphics card that will keep up with the E5400 - for all those who keep thinking - if they finally unlock rtx in solitaire, " +
      "I would think hard, but for sapper fans and normal enthusiasts, I recommend the 3080.",
    avatar: Avatar,
    date: "01.10.2021",
    username: "Theo98",
    censored: false,
    score: 5,
    userId: "12154123123126"
  },
  {
    id:"12647543231",
    cardId: "1231151-Afa-231-FAs",
    opinion: "The card bought in April 2021, at a completely normal price, works very well with the XPG Core Reactor 850W power supply, " +
      "I have temperature of 77C under load - a good result, but far from great for such a power-hungry graphic system.",
    avatar: Avatar,
    date: "26.04.2021",
    username: "Martin",
    censored: false,
    score: 5,
    userId: "12154123123123"
  },
  {
    id:"10130160409031",
    cardId: "1231151-Afa-231-FAs",
    opinion: "The card bought in April 2021, at a completely normal price, works very well with the XPG Core Reactor 850W power supply, " +
      "I have temperature of 77C under load - a good result, but far from great for such a power-hungry graphic system.",
    avatar: Avatar,
    date: "26.03.2022",
    username: "Gary",
    censored: true,
    score: 3,
    userId: ""
  },
];