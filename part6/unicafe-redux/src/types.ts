export interface FeedbackState {
  good: number,
  ok: number,
  bad: number,
};

export interface FeedbackAction {
  type: FeedbackActionType,

}

export enum FeedbackActionType {
  GOOD, OK, BAD, DO_NOTHING, ZERO,
}