import {Box, Button, Flex, Skeleton, Stack} from '@chakra-ui/react'
import {FindOneOptions} from 'mongodb'
import Link from 'next/link'

import {AddIcon, GiftIcon, RegionIcon, SignOutIcon} from 'lib/components/icons'
import ListGroupItem from 'lib/components/list-group-item'
import {ExternalLink} from 'lib/components/link'
import Logo from 'lib/components/logo'
import {AUTH_DISABLED} from 'lib/constants'
import {useRegions} from 'lib/hooks/use-collection'
import useLink from 'lib/hooks/use-link'
import useRouteTo from 'lib/hooks/use-route-to'
import useUser from 'lib/hooks/use-user'
import withAuth from 'lib/with-auth'

const alertDate = 'May, 2021'
const alertText = 'GTFS validation, clearer charts, and more.'

const findOptions: FindOneOptions<CL.Region> = {sort: {name: 1}}

export default withAuth(function SelectRegionPage() {
  const {data: regions} = useRegions({
    options: findOptions
  })
  const {user} = useUser()
  const {accessGroup, email} = user ?? {}
  const goToRegionCreate = useRouteTo('regionCreate')
  const logoutLink = useLink('logout')
  const goToRegion = useRouteTo('projects')

  return (
    <Flex
      alignItems='center'
      direction='column'
      py={10}
      zIndex={1} // Necessary for scrolling bug when Modals are closed (should be fixed in Chakra v1)
    >
      <Box mt={8} mb={6}>
        <Logo />
      </Box>
      <Stack spacing={4} width='320px'>
        {!AUTH_DISABLED && (
          <Box textAlign='center'>
            <span>signed in as </span>
            <strong>
              {email} ({accessGroup})
            </strong>
          </Box>
        )}
        <Box>
          <ExternalLink href='https://docs.conveyal.com/changelog'>
            <ListGroupItem
              rightIcon={
                <Box fontSize='3xl' pb={1}>
                  <GiftIcon />
                </Box>
              }
            >
              <div>
                <strong>{alertDate}</strong> — {alertText} Click for details.
              </div>
            </ListGroupItem>
          </ExternalLink>
        </Box>
        <Button
          isFullWidth
          leftIcon={<AddIcon />}
          onClick={goToRegionCreate}
          colorScheme='green'
        >
          Set up a new region
        </Button>
        {regions == null ? (
          <Skeleton id='LoadingSkeleton' height='20px' />
        ) : (
          <Stack spacing={4}>
            {regions.length > 0 && (
              <Box textAlign='center'>or go to an existing region</Box>
            )}
            <Stack spacing={0}>
              {regions.map((region) => (
                <ListGroupItem
                  key={region._id}
                  leftIcon={<RegionIcon />}
                  onClick={() => goToRegion({regionId: region._id})}
                >
                  {region.name}
                </ListGroupItem>
              ))}
            </Stack>
          </Stack>
        )}
        {!AUTH_DISABLED && (
          <Link href={logoutLink} passHref>
            <Button
              as='a'
              colorScheme='blue'
              leftIcon={<SignOutIcon />}
              variant='link'
            >
              Log out
            </Button>
          </Link>
        )}
      </Stack>
    </Flex>
  )
})
