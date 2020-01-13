exports.contactsNeedingInvitations = `query ContactsByInvitationStatus(
  $invitationStatus: InvitationStatusType
  $createdAt: ModelStringKeyConditionInput
  $sortDirection: ModelSortDirection
  $filter: ModelContactFilterInput
  $limit: Int
  $nextToken: String
) {
  contactsByInvitationStatus(
    invitationStatus: $invitationStatus
    createdAt: $createdAt
    sortDirection: $sortDirection
    filter: $filter
    limit: $limit
    nextToken: $nextToken
  ) {
    items {
      id
      createdAt
      phone
      user {
        firstName
        lastName
      }
    }
    nextToken
  }
}
`;
