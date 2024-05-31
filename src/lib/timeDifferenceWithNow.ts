export default function timeDifferenceWithNow(givenTime: any) {
  const currentTime = new Date();
  const givenTimeObject = new Date(givenTime);
  const differenceInSeconds = Math.floor(
    (currentTime.getTime() - givenTimeObject.getTime()) / 1000
  );
  return differenceInSeconds * -1;
}
