export interface IUseCase<K, V> {
  execute(dto: K): Promise<V>;
}
