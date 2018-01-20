import * as Agent from './util/agent'

const HUE_URL = process.env.HUE_URL
const HUE_USER = process.env.HUE_USER

export async function getGroups( req, res ) {
  try {
    const results = await Agent.get(`${HUE_URL}${HUE_USER}/groups`)

    res.json(JSON.parse(results.text))
  } catch ( error ) {
    console.error(`Error retrieving groups: ${error}`)
    res.status(500).send(error)
  }
}

export async function toggleGroup( req, res ) {
  try {
    const groupId = req.param.id
    const response = await Agent.get(`${HUE_URL}${HUE_USER}/groups/${groupId}`)
    const groupDetails = JSON.parse(response.text)

    const currentState =
      groupDetails && groupDetails.state && groupDetails.state.any_on ?
      groupDetails.state.any_on : false

    console.log({groupDetails})
    const results = await Agent.put(
      `http://10.0.0.2/api/${process.env.HUE_USER}/groups/${groupId}/action`,
      { on: !currentState },
    )

    res.json(JSON.parse(results.text))
  } catch ( error ) {
    console.error(`Error retrieving groups: ${error}`)
    res.status(500).send(error)
  }
}
