package com.servlet;

import java.io.IOException;


import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.util.product_DB;


@WebServlet("/addToSale")
public class addToSale extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
   
	protected void doPost(HttpServletRequest req, HttpServletResponse res) throws ServletException, IOException {
		
		String [] saleIds = req.getParameterValues("saleIds[]");
		String percentage = req.getParameter("percentage");
		product_DB pro = new product_DB();
		
		boolean isSuccess = pro.addToSale(saleIds,percentage);
		
		System.out.println("sale add is "+isSuccess);
		
	}


	

}
