// @ts-nocheck
// noinspection CommaExpressionJS
import { digitalTwinApi, updateDataSourceButtonLink } from "../digitalTwinApi";
import Grid from "@material-ui/core/Grid";
import { TableContainer } from "@material-ui/core";
import Box from "../components/box";

export const DataSources = () => {
  const { queries } = digitalTwinApi();

  const { data, isLoading, isLoadingError } = queries.useGetConnectors();

  if (!data || isLoadingError) return null;

  const connectors = data.connectors;

  if (!connectors) return null;

  if (!connectors.length && !isLoading) return null;

  return (
      <Grid item xs={12} md>
        <TableContainer id="featured-data-sources">
          <h1>Import Your Data</h1>
          <div>
            <Grid container>
              {connectors.map((dataSource) => (
                  <div key={dataSource.id}>
                    <Box>
                      <Grid container alignItems="center" spacing={3}>
                        <Grid item xs={12} md={3}>
                          <img src={dataSource.image} alt={dataSource.name} />
                        </Grid>
                        <Grid item xs={12} md={9}>
                          <div>
                            <p>{dataSource.longDescription}</p>
                          </div>
                          {dataSource.buttons.map(
                              (button, index) => (
                                  // eslint-disable-next-line no-sequences
                                  updateDataSourceButtonLink(button),
                                      (
                                          <a key={index} href={button.link}>
                                            <img src={button.image} alt={'hi'} />
                                            {button.text}
                                          </a>
                                      )
                              )
                          )}
                        </Grid>
                      </Grid>
                    </Box>
                  </div>
              ))}
            </Grid>
          </div>
        </TableContainer>
      </Grid>
  );
};

export default function Connect() {
  return (
      <div className="stat-cards-wrapper">
        <div className="max-w-7xl mx-auto py-4 px-6 sm:px-16">
          <div className="stat-cards -mt-24 mb-16 pl-8 grid gap-x-16 gap-y-[8vw] md:grid-cols-2">
            {DataSources()}
          </div>
        </div>
      </div>
  );
}
