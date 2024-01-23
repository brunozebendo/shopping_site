/**Esse é o projeto da seção 10, cujo objetivo é apresentar
 * alternativas para o drill prop que é quando
 * se tem que passar estados para muitos componentes diferentes
 * Para isso, vamos trabalhar com um site de compras
 * com vários carts com fotos e acima uma opção
 * para as compras, como um carrinho.
 * Os componente já vieram preenchidos, por isso estão sem
 * explicação.
 */

/**A primeira explicação é o Component Composition que consiste em
 * tirar a lógica de um componente e incluir em outro, como no exemplo abaixo, 
 * a lógica ficava no componente Shop e era preciso passar um props
 * para a função handleAddItemToCart além de outro para o product, já que
 * ambos estão em outros componentes. Portanto, incluindo a lógica abaixo
 * dentro do return do App se diminui o número de passagens. Sendo necessário
 * fazer as devidas importações no novo componente.
 */

<Shop>    
{DUMMY_PRODUCTS.map((product) => (
    <li key={product.id}>
      <Product {...product} onAddToCart={handleAddItemToCart} />
    </li>
  ))}
</Shop>
/**Já o componente Shop foi conservado para poder envelopar o item acima */

export default function Shop({ children }) {
    return (
      <section id="shop">
        <h2>Elegant Clothing For Everyone</h2>
  
        <ul id="products">
         {children}
        </ul>
      </section>
/**A segunda opção é o context API que é  um hook do React criado para administrar
 * estados entre vários componentes. Ele deve ser usado quando forem dois ou
 * mais componentes a usar o estado, ele fica entre o props( mais prático
 * para menos componente ) e o redux (usado para muitos componentes)
*/
/**Para utilização do Context, primeiro criou-se uma nova pasta dentro do
 * src, chamada, por convenção, de store e, dentro dela, o componente
 * shopping-cart-context.jsx que está assim, por enquanto. Atentar para
 * o import e para estado inicial que, nesse caso, é um array vazio,
 * mas poderia ser qualquer coisa.
  */

import { createContext } from "react";

export const CartContext = createContext({
    items: []
});

/**Já no componente App, o create Context foi utilizado
 * para envelopar outros componentes. Reparar que
 * o componente é chamado na sintaxe padrão, mas
 * tem um .Provider que indica que os dados vão vir
 * daquele componente.
 */

return (
    <CartContext.Provider>
      <Header
        cart={shoppingCart}
        onUpdateCartItemQuantity={handleUpdateCartItemQuantity}
      />
      <Shop>    
      {DUMMY_PRODUCTS.map((product) => (
          <li key={product.id}>
            <Product {...product} onAddToCart={handleAddItemToCart} />
          </li>
        ))}
      </Shop>
      </CartContext.Provider>

/**Agora que os elementos foram providos, eles precisam ser recebidos, para isso,
 * o primeiro passo é ir no componente que irá recebe-los, nesse caso, o cart (equivalente
 * ao carrinho de compra) e fazer as importações abaixo, primeiro o hook useContext que
 * vou explicar melhor no material auxiliar e o componente que está passando os dados.
 */
import { useContext } from 'react';

import { CartContext } from '../store/shopping-cart-context.jsx'

/**Então é criada a variável onde items é o valor inicial setado
 * no componente shopping-cart-context e CartContext o nome do componente que 
 * está sendo lá exportado
 */

const {items} = useContext(CartContext);

/**No return do App é preciso estabelecer um value inicial, pois, se não, dá erro.
 * Sendo o valor inicial setado no context utilizado quando o componente não está 
 * envelopado por ele, também serve como sugestão para autocompletar.
 */

return (
    <CartContext.Provider value={{items: []}}></CartContext.Provider>

/**Na aula 188 serão substituidos mais alguns props por mais userContext,
 * Dentro do App, foi setado o valor inicial abaixo
 */

return (
    <CartContext.Provider value={ctxValue}>

</CartContext.Provider>

/**Que se refere à variável criada um pouco acima */

const ctxValue = {
    items:shoppingCart.items,
    addItemToCart: handleAddItemToCart
  };

/**Já a variável acima guarda o state inicial do carrinho de compra e o array de items
* como um valor, além da função para atualizar o State
  */

  function App() {
    const [shoppingCart, setShoppingCart] = useState({
      items: [],
    });

    ...
    function handleAddItemToCart(id) {
        setShoppingCart((prevShoppingCart) => {
          const updatedItems = [...prevShoppingCart.items];

/**No componente Product, onde eram usados props, então é feita a importação */

import { useContext } from "react";
import { CartContext } from "../store/shopping-cart-context";
/**Ainda em Product é inserida a linha que seta o CartContext como valor inicial
 * e o addItemToCart (que guarda a função para atualizar o array).
 */
const {addItemToCart} = useContext(CartContext);
/**Para isso foi preciso atualizar o compomente provedor (CartContext) */

import { createContext } from "react";

export const CartContext = createContext({
    items: [],
    addItemToCart: () => {},
});

/**Assim, no button do componente Product, foi passada a função abaixo  */

<button onClick={() => addItemToCart(id)}>Add to Cart</button>

/**Na aula 189 o professor mostrou um outro modo, mais antigo, de
 * usar o Context que é esse abaixo, tem que se usar a sintaxe .Consumer e
 * desfragmentar o nome do componente (cartCTX) para depois ser chamado. No final
 * da aula, voltou ao código antigo com
 */

return (
  <CartContext.Consumer>
    {(cartCTX) => {
      const totalPrice = cartCTX.items.reduce(

</CartContext.Consumer>
/**Na aula 190 explicou que quando o componente provedor é re-renderizado,
 * o componente receptor também é.
 * já na aula 191 vai acabar de trocar os props pelo context, primeiro no Header
 * onde apagou os props que estavam dentro do componente, dentro do return
 * do App e também do () no recebimento do componente. Depois no CartContext que
 * é o componente provedor nesse caso e o useContext são importados
 * Depois, ainda no header, é inserida a linha abaixo que, usando o 
 * destructuring, traz o items(o array de items) para componente */
const { items } = useContext(CartContext);

/**Já no componente Cart.js são trazidos os valores abaixo que são
 * novamente o array e um props que passa a função para atualizar a 
 * quantidade, esse props foi criado no App, passado para o componente
 * padrão shopping-cart-context e aqui utilizado, como poderia ser
 * em qualquer item.
 */

export default function Cart() {
  const {items, updateItemQuantity} = useContext(CartContext);

  ...

  <button onClick={() => updateItemQuantity(item.id, -1)}>
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateItemQuantity(item.id, 1)}></button>
/**Depois da refatoração, o código continua funcionando, mas com menos poluição visual
 * e com menos chance de erro.
 */
/**Na aula 192, em continuidade a refatoração, o componente CartContext.Provider que
 * cuida da transmissão dos dados entre diferentes componentes e, no momento, está
 * no APP, foi copiado para o componente shopping-cart-context.jsx que, pelo que
 * entendi, é um componente para envelopar essas funções que devem ser compartilhadas.
 * Assim, foi criado o código abaixo e dentro do {} copiada toda a lógica que estava
 * no App
 */
export default function CartContextProvider({children}) {}

/**foram feitas as importações necessárias nos dois componentes e então criado o return 
 * abaixo. O return é que vai garantir que o componente retorne algo, nesse caso, o 
 * {children} faz com que o componente possa envolver diferentes valores, em diferentes
 * componentes
 */

return <CartContext.Provider value={ctxValue}>
        {children}
    </CartContext.Provider>

/**Por fim, o componente é usado no App para evolver os outro componentes */

<CartContextProvider>
<Header />
<Shop>    
{DUMMY_PRODUCTS.map((product) => (
    <li key={product.id}>
      <Product {...product} />
    </li>
  ))}
</Shop>
</CartContextProvider>

/**Na aula 193 vai explicar o useReducer, que expliquei no material complementar, 
 * aqui explicarei só a aplicação no código. O reducer é um método do JS que reduz 
 * o resultado de uma função e guarda em uma variável. Já o hook useReducer vai
 * substituir o padrão abaixo, onde o prev é o estado anterior
 */
function handleUpdateCartItemQuantity(productId, amount) {
  setShoppingCart((prevShoppingCart) => {

/**Então ele é um substituto para o useState quando se tem q controlar mais estados */
/**Primeiro, importa-se o hook, depois, cria o código abaixo
 */
/**Fora do escopo da função principal, pois não precisa ser re-renderizada, é criada
 * a função abaixo que recebe dois parâmetros, o estado, que vai ser sempre o estado
 * atualizado, e a ação, também haverá um retorno que será definido na próxima aula
 */
function shoppingCartReducer(state, action) {
  return state;
}
/**Já a função abaixo vai receber dois argumentos, state e dispatch e o useReducer
 * vai receber a função anteriormente criada como primeiro argumento e pode
 * receber um segundo argumento para valor inicial, nesse caso, um array vazio
*/
export default function CartContextProvider({children}) {
  const [shoppingCartState, shoppingCartDispatch ] = useReducer(
    shoppingCartReducer,
    {
      items: [],
    }
     );
/**A aula 194 vai finalizar a mudança do useState para useReducer. A ideia é que
 * a função que antes continha toda a lógica de atualização do estado, agora
 * contenha só o identificador que vai servir para diferenciar qual função
 * está sendo despachada no dispatch, assim, por convenção, é adicionado um type
 * para guardar um nome que será usado no reducer para saber qual função está sendo
 * despachada e payload com o id, nesse caso, para identificar o id do item, ou seja,
 * o type servirá para identificar a função q está sendo chamada e payload, o item
 * que ele carrega.
  */

function handleAddItemToCart(id) {
  shoppingCartDispatch({
    type:'ADD_ITEM',
    payload: id
  });
/**Assim, seguindo a lógica, na função reducer, o action é alimentado
 * com o devido type e se for aquele o type, ele aplica a lógica seguinte. Se tiver
 * mais opções, se colocaria mais if, ou usaria um switch. O tamanho do código
 * é o mesmo, mas tem-se a garantia de que sempre se terá o último estado e a lógica
 * fica separada no reducer 
 */

function shoppingCartReducer(state, action) {
  if (action.type ==='ADD_ITEM')

//aqui entra a lógica para adicionar, ela foi tirada do state e mudado só os
//nomes q se referiam ao state e id q foram mudados (está no código principal)
 
/** A mesma lógica foi aplicada na função para atualizar a quantidade, sendo
 * que o payload (carga), nesse caso, leva duas informações
*/

function handleUpdateCartItemQuantity(productId, amount) {
  shoppingCartDispatch({
    type: 'UPDATE_ITEM',
    payload: {
      productId,
      amount
    }
  })
}
/**Na mesma lógica é inserido mais um if na função reducer para caso a opção
 * seja desse type
 */
if (action.type === 'UPDATE_ITEM') {
  //aqui fica toda a lógica para atualizar
/**Por fim, o hook também poderia ser usado em outros componentes, não estando
 * atrelado a esse componente.
 */
/**Após concluir o módulo, o número da aulas foi modificado, pois foi acrescentado mais conteúdo
 * ao curso. Agora está em 170...
 */