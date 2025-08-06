import { gql } from '@apollo/client';

export const GET_LAUNCHES = gql`
  query GetLaunchesWithRockets {
  launchesPast(limit: 30) {
    mission_id
    mission_name
    launch_date_utc
    launch_success
    rocket {
      rocket {
        id
        name
        mass {
          kg
        }
        payload_weights {
          kg
        }
      }
    }
  }
}
  `;

export const GET_LAUNCHES_BY_PAGE = gql`
  query GetAllLaunches($limit: Int! = 10, $offset: Int! = 1) {
  launchesPast(limit: $limit, offset: $offset) {
    mission_name
    launch_date_utc
    rocket {
      # rocket_name
      # rocket_type
      rocket {
        id
        name
        type
        mass {
          kg
        }
        payload_weights {
          kg
        }
      }
    }
  }
}
  `;