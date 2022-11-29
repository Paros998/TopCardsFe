import { ReviewModel } from "../../interfaces/models/ReviewModel";
import dayjs from "dayjs";

export const ReviewInitialValues: ReviewModel = {
  score: 0,
  reviewDate: dayjs().toISOString(),
  opinion: '',
  isCensored: false
}