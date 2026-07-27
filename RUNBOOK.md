# STACKFORGE PRODUCTION OPERATIONAL RUNBOOK

## System Architecture Overview
StackForge V9 is a Next.js 15 App Router application with PostgreSQL database managed via Prisma ORM 5.22, Supabase Auth SSR session management, and serverless background execution.

---

## 1. Database Operations & Backups

### Automated Daily Snapshots
- Supabase / Managed PostgreSQL executes daily point-in-time recovery (PITR) backups with 7-day retention.

### Manual Backup Command
```bash
# Export full database schema and content snapshot
pg_dump -h <DB_HOST> -U <DB_USER> -d <DB_NAME> -F c -b -v -f backup_stackforge_$(date +%Y%m%d_%H%M%S).dump
```

### Database Restoration Runbook
```bash
# Restore snapshot to target database instance
pg_restore -h <DB_HOST> -U <DB_USER> -d <DB_NAME> -v --clean backup_stackforge_target.dump
```

### Zero-Downtime Migration Execution
```bash
# Apply pending production migrations cleanly
npx prisma migrate deploy
```

---

## 2. Health Monitoring & Diagnostics

- **Health Check Endpoint**: `GET /api/health`
  - Validates DB ping latency (< 50ms expected).
  - Reports heap memory and Node runtime state.
- **Admin Analytics Dashboard**: `GET /api/admin/analytics`
- **Structured Log Format**: All server logs emit JSON with `level`, `timestamp`, `userId`, `action`, and redacted secrets.

---

## 3. Incident Response & Deployment Rollback

### Feature Flag Instant Kill-Switch
If a new feature (e.g. `github_sync_v2` or `real_learning_graph`) encounters critical errors:
```bash
# Instantly disable feature flag via admin API
curl -X POST https://stackforge.dev/api/admin/feature-flags \
  -H "Content-Type: application/json" \
  -d '{"key": "github_sync_v2", "enabled": false}'
```

### Deployment Rollback Protocol (Vercel CLI / Infrastructure)
```bash
# Roll back live traffic instantly to previous successful deployment
vercel rollback <PREVIOUS_DEPLOYMENT_ID>
```

---

## 4. Content Audit & Security Inspection
- Run assessment quality audit: `GET /api/admin/assessment-quality`
- Inspect admin audit logs: `GET /api/admin/analytics`
