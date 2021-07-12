mod utils;

use wasm_bindgen::prelude::*;

// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[wasm_bindgen]
extern "C" {
    fn alert(s: &str);
}

#[wasm_bindgen]
pub fn greet() {
    alert("Hello, markdown-wasm!");
}

// #[wasm_bindgen]
// pub fn greet() -> String {
//     "Hello, wasm-game-of-life!".into()
// }

use pulldown_cmark::{html, Options, Parser};

#[wasm_bindgen]
pub fn pulldown_cmark(source_text: &str) -> String {
    let markdown_input = source_text;

    let mut options = Options::empty();
    options.insert(Options::ENABLE_STRIKETHROUGH);
    let parser = Parser::new_ext(markdown_input, options);

    let mut html_output = String::new();
    html::push_html(&mut html_output, parser);
    html_output
}
