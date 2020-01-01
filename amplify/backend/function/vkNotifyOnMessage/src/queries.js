exports.eventPhonesByEvent = `query EventPhonesByEvent(
  $eventId: ID
  $createdAt: ModelStringKeyConditionInput
  $sortDirection: ModelSortDirection
  $filter: ModelEventPhoneFilterInput
  $limit: Int
  $nextToken: String
) {
  eventPhonesByEvent(
    eventId: $eventId
    createdAt: $createdAt
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      event {
        id
        type
      }
      usersByPhone(limit: 1) {
        items {
          id
          phone
          isParent
          deletedAt
          pushToken
          pushEnabled
          pushEnabledForEvents
          pushEnabledForMessages
          contacts(limit: 500) {
            items {
              id
              type
              phone
              usersByPhone(limit: 1) {
                items {
                  id
                  phone
                  isParent
                  pushToken
                  pushEnabled
                  pushEnabledForEvents
                  pushEnabledForMessages                  
                }
              }
            }
          }
        }
      }
    }
    nextToken
  }
}
`;
