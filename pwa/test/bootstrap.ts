import { loadJsonFixtures } from '.'
import path from 'node:path'
import type { RoutingData } from '~/utils/routing'
import { Routing } from '~/utils/routing'

const data: RoutingData = loadJsonFixtures(path.join(__dirname, '/fixtures/routes.json'))

Routing.setRoutingData(data)
