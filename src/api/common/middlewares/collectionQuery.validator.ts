import { SortDir } from '../helpers/collectionQuery.helper';
import { requestValidator$, t } from '@marblejs/middleware-io';

type CollectionQueryValidatorOpts = {
  sortBy: string[];
};

const createQuery =  (opts: CollectionQueryValidatorOpts) => t.partial({
  sortBy: t.union(
    opts.sortBy.map(s => t.literal(s)) as any
  ),
  sortDir: t.union([
    t.literal(SortDir.ASC),
    t.literal(SortDir.DESC),
  ]),
  limit: t.refinement(t.number, n => n >= 0),
  page: t.refinement(t.number, n => n >= 1),
});

export const collectionQueryValidator$ = (opts: CollectionQueryValidatorOpts) =>
  requestValidator$({ query: createQuery(opts) });

export type CollectionQuery = t.TypeOf<ReturnType<typeof createQuery>>;
