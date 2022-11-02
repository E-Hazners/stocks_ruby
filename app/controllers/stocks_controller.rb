class StocksController < ApplicationController
  def index
    @stocks = SStock.all
  end
  
end
