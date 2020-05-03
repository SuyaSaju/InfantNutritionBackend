import { ObjectID } from 'typeorm';

export interface Sentiment {
  positive: number
  negative: number
  neutral: number
  compound: number
}

export interface Review {
  _id: ObjectID
  name: string
  rating: number
  title: string
  date: Date
  isVerifiedPurchase: boolean
  textContent: string
  foundHelpful: number
  sentiment: Sentiment
}
