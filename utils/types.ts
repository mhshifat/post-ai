import { getConnections } from '@/actions/connections';
import { getDomains } from '@/actions/domains';
import { domains } from '@/db/schema';
import { InferSelectModel } from 'drizzle-orm';

export type IDomain = InferSelectModel<typeof domains>;
export type IDomainsWithUserId = Awaited<ReturnType<typeof getDomains>>;
export type IConnectionsWithUserId = Awaited<ReturnType<typeof getConnections>>;