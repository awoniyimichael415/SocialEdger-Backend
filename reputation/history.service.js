export function buildReputationHistory(...sources) {

  const history = [];

  sources.forEach((source) => {

    if (!source) return;

    if (!source.reasons) return;

    source.reasons.forEach((reason) => {

      history.push({

        title: reason.title,

        reputation: reason.reputation,

        type:
          reason.reputation >= 0
            ? "earned"
            : "penalty",

        createdAt: new Date(),

      });

    });

  });

  /*
  =====================================
  HIGHEST REPUTATION FIRST
  =====================================
  */

  history.sort(
    (a, b) =>
      Math.abs(b.reputation) -
      Math.abs(a.reputation)
  );

  return history;

}