import {inject, Provider} from '@loopback/core';
import {getService} from '@loopback/service-proxy';
import {KeycloakDataSource} from '../datasources';

export interface Keycloak {
  ping(): Promise<object>;
}

export class KeycloakProvider implements Provider<Keycloak> {
  constructor(
    // Keycloak must match the name property in the datasource json file
    @inject('datasources.Keycloak')
    protected dataSource: KeycloakDataSource = new KeycloakDataSource(),
  ) {}

  value(): Promise<Keycloak> {
    return getService(this.dataSource);
  }
}
